import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { paginate } from "../../utils/paginate";
import "./candidate.css";

const DevResumeScreening = ({ candidateList1 = [] }) => {
  const { id } = useParams();
  const [employeeID, setEmployeeID] = useState({});
  const [pagesize, setpagesize] = useState(8);
  const [currentpage, setcurrentpage] = useState(1);
  const [candidatesList, setcandidateslist] = useState([]);
  const [showSidebar, setShowSidebar] = useState("");

  // const handlePageChange = (pageNo) => {
  //     setcurrentpage(pageNo);
  //   };
  //const candidate = paginate(candidateList, currentpage, pagesize);

  useEffect(() => {
    fetchCandidates();
    fetchEmployeeID();
  }, []);

  const fetchCandidates = async () => {
    const usertoken = localStorage.getItem("token");
    await axios
      .get("http://localhost:8000/candidate/candidate-list", {
        headers: { token: usertoken },
      })
      .then((res) => {
        //const cc = res.data.candidates
        setcandidateslist(res.data.candidates);
        console.log(res);
        //localStorage.clear();
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

  return (
    <div style={{ marginTop: "2em" }}>
      <h3 className="candiText">Resume screening</h3>
      <div className="row pending" style={{ marginLeft: "3em" }}>
        <div className="col-6" style={{ paddingLeft: "20px" }}>
          <b style={{fontSize:"larger"}}>Pending resumes</b>
        </div>
        <div className="col-6" style={{ paddingRight: "150px" }}>
          <b style={{fontSize:"larger"}}>Screened resumes</b>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-6">
            {candidatesList.length &&
              candidatesList.map((v, index) => (
                <>
                  {employeeID === v.devScreeningEmpId &&
                  v.devScreeningMessage === null ? (
                    <div
                      className="col-8 pend"
                      style={{ paddingLeft: "150px" }}
                    >
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        to={`/dev-card/${v._id}`}
                      >
                        {v.name}
                      </Link>
                    </div>
                  ) : (
                    <span hidden="true"></span>
                  )}
                </>
              ))}
          </div>
          <div className="col-6">
            {candidatesList.length &&
              candidatesList.map((v, index) => (
                <>
                  {employeeID === v.devScreeningEmpId &&
                  v.devScreeningMessage !== null ? (
                    <div className="col-6 pend">
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        to={`/dev-card/${v._id}`}
                      >
                        {v.name}
                      </Link>
                    </div>
                  ) : (
                    <span hidden="true"></span>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
      {/* <table
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
            <th style={{ textAlign: "center" }}>Pending Resumes</th>
            <th style={{ textAlign: "center" }}>Screened Resume</th>
          </tr>
        </thead>
        <tbody>
          {candidatesList.length &&
            candidatesList.map((v, index) => (
              <>
                {employeeID === v.devScreeningEmpId ? (
                  <tr key={v.id}>
                    <td style={{ textAlign: "center" }}>
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        to={`/dev-card/${v._id}`}
                      >
                        {v.devScreeningMessage === null ? (
                          v.name
                        ) : (
                          <span hidden="true"></span>
                        )}
                      </Link>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {v.devScreeningMessage !== null ? (
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/dev-card/${v._id}`}
                        >
                          {v.name}
                        </Link>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            ))}
        </tbody>
      </table> */}
      {/* <div className="page">
        <Pagination
          lenght={candidateList.length}
          pagesize={pagesize}
          onChange={handlePageChange}
          currentpage={currentpage}
        />
      </div> */}
    </div>
  );
};

export default DevResumeScreening;
