import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import { paginate } from "../../utils/paginate";
import "./candidate.css";
import UserCandidate from "./UserCandidate";

const CandidateTabel = ({ candidateList1 = [] }) => {
  const [searchParams] = useSearchParams();
  const jobid = searchParams.get("jobid");
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [employeeID, setEmployeeID] = useState({});
  const [pagesize, setpagesize] = useState(8);
  const [currentpage, setcurrentpage] = useState(1);
  const [candidateList, setcandidatelist] = useState("");
  const [showSidebar, setShowSidebar] = useState("");
  const [candidateHR, setCandidateHR] = useState([]);
  const [candidateFirstRound, setcandidateFirstRound] = useState([]);
  const [candidateSecondRound, setcandidateSecondRound] = useState([]);
  const [candidateFinalRound, setcandidateFinalRound] = useState([]);
  const [candidateOfferedRound, setcandidateOfferedRound] = useState([]);
  const [candidateOnBoardRound, setcandidateOnBoardRound] = useState([]);
  const [candidateDevScreeningRound, setcandidateDevScreeningRound] = useState(
    []
  );
  const [candidateRejected, setcandidateRejected] = useState([]);
  const [candidateOnHold, setcandidateOnHold] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  

  const handlePageChange = (pageNo) => {
    setcurrentpage(pageNo);
  };
  const candidate = paginate(candidateList1, currentpage, pagesize);

  useEffect(() => {
    fetchCandidates();
    loadJob();
    fetchEmployeeID();
  }, []);

  const loadJob = async () => {
    const usertoken = localStorage.getItem("token");
    const result = await axios.get(`http://localhost:8000/job/all-jobs/`, {
      headers: { token: usertoken },
    });
    setJob(result.data);
    console.log(result);
  };

  const fetchCandidates = async () => {
    const usertoken = localStorage.getItem("token");

    await axios
      .get("http://localhost:8000/candidate/candidate-list", {
        headers: { token: usertoken },
      })
      .then((res) => {
        //const cc = res.data.candidates
        setcandidatelist(res.data.candidates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEmployeeID = async () => {
    try {
      const authuserString = localStorage.getItem("authuser");
      console.log("start", authuserString);
      //  const data = authuserString.trim();
      console.log(typeof authuserString, "end");
      const auth = JSON.parse(authuserString);
      const empid = auth.id;
      setEmployeeID(empid);
      console.log(empid);
    } catch (err) {
      console.log(err);
    }
  };

  const userSidebar = async () => {
    try {
      const authuserString = localStorage.getItem("authuser");
      const auth = JSON.parse(authuserString);
      console.log(auth);
      if (auth.userType && auth.userType === "2") {
        setShowSidebar("2");
      } else {
        console.log(auth.userType);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userSidebar();
  }, []);

  

  // const ccc = async () => {
  //   try {
  //     const usertoken = localStorage.getItem("token");
  //     const result = await axios.get(
  //       `http://localhost:8000/candidate/user-candidate`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           token: usertoken,
  //         },
  //       }
  //     );
  //     setUserCandidate(result.data.candidates);
  //     console.log(setUserCandidate(result.data.candidates));
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div style={{ marginTop: "2em" }}>
      {/* <p>There are {candidateList1 ? candidateList1.length:0} Student in Database</p> */}
      <table
        className="table "
        style={{
          background: "#DCECF7",
          opacity: "0.8",
          borderRadius: "10px",
          boxShadow: "5px 7px #ACB1B3",
        }}
      >
        <thead>
          <tr>
            <th>Slno</th>
            <th>Name</th>
            <th>JobID</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Expertise</th>
            <th>Expected CTC</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {candidate.length &&
            candidate.map((v, index) => (
              <tr key={v.id}>
                {employeeID === v.hrID ||
                employeeID === v.devScreeningEmpId ||
                employeeID === v.firstRoundEmpId ||
                employeeID === v.secondRoundEmpId ||
                employeeID === v.finalRoundEmpId ||
                employeeID === v.offeredRoundEmpId ||
                employeeID === v.onBoardedRoundEmpId ||
                employeeID === v.rejectedByEmpId ||
                employeeID === v.onHoldByEmpId ? (
                  <>
                    <td>{index + (currentpage - 1) * pagesize + 1}</td>
                    <td>
                      {showSidebar === "2" ? (
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/dev-card/${v._id}`}
                        >
                          {v.name}
                        </Link>
                      ) : (
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/view-candidate/${v._id}`}
                        >
                          {v.name}
                        </Link>
                      )}
                    </td>
                    <td>
                      {job.length &&
                        job.map((m) => (
                          <div key={m._id}>
                            {m._id === v.jobid ? (
                              m.jobid
                            ) : (
                              <p hidden="true"></p>
                            )}
                          </div>
                        ))}
                    </td>
                    <td>{v.phone}</td>
                    <td>{v.email}</td>
                    <td>{v.expertise}</td>
                    <td>{v.expectedCtc} </td>
                    <td>
                      {v.onHoldByEmpId
                        ? "On-hold"
                        : v.rejectedByEmpId
                        ? "Rejected"
                        : v.onBoardedRoundEmpId
                        ? "On Boarded"
                        : v.offeredRoundEmpId
                        ? "Offered"
                        : v.finalRoundEmpId
                        ? "Final round"
                        : v.secondRoundEmpId
                        ? "Second round"
                        : v.firstRoundEmpId
                        ? "First round"
                        : v.devScreeningEmpId
                        ? "Dev screening"
                        : ""}
                    </td>
                  </>
                ) : (
                  ""
                  // <span hidden="true"></span>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="page">
        <Pagination
          lenght={candidateList1.length}
          pagesize={pagesize}
          onChange={handlePageChange}
          currentpage={currentpage}
        />
      </div>
      
    </div>
  );
};

export default CandidateTabel;
