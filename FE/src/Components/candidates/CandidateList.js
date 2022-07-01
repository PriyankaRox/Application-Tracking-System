import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import "./candidate.css";
import CandidateTabel from "./CandidateTabel";
import UserCandidate from "./UserCandidate";


function Candidatelist() {
  const [searchParams] = useSearchParams(); 
  const jobid= searchParams.get('jobid');
  const [employees, setEmployees] = useState({});
  const [allCandidates, setAllCandidates] = useState([]);
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
  const [employeeID, setEmployeeID] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchEmployee();
  }, []);
  
  const fetchUsers = async () => {
    try{
    let url = "";
    if(jobid){
      url="http://localhost:8000/candidate/candidate-list?jobid="+jobid
    } else{
      url="http://localhost:8000/candidate/candidate-list"
    }
    const usertoken = localStorage.getItem("token");
    await axios
      .get(url,{ headers: { token: usertoken } })
      .then((res) => {
        const rejectedCandidates = [];
        const onHoldCandidates = [];
        const onBoardedCandidates = [];
        const offeredRoundCandidates = [];
        const finalRoundCandidates = [];
        const secondRoundCandidates = [];
        const firstRoundCandidates = [];
        const devScreeningRoundCandidates = [];
        res.data.candidates.forEach((v) => {
          if (v.isRejected === false || v.rejectedByEmpId) {
            rejectedCandidates.push({ ...v });
          } else if (v.isOnHold === "false" || v.onHoldByEmpId) {
            onHoldCandidates.push({ ...v });
          } else if (v.onBoardedRoundMessage || v.onBoardedRoundEmpId) {
            onBoardedCandidates.push({ ...v });
          } else if (v.offeredRoundIsSelected || v.offeredRoundEmpId) {
            offeredRoundCandidates.push({ ...v });
          } else if (v.finalRoundIsSelected || v.finalRoundEmpId) {
            finalRoundCandidates.push({ ...v });
          } else if (v.secondRoundIsSelected || v.secondRoundEmpId) {
            secondRoundCandidates.push({ ...v });
          } else if (v.firstRoundIsSelected || v.firstRoundEmpId) {
            firstRoundCandidates.push({ ...v });
          } else if (v.devScreeningIsSelected || v.devScreeningEmpId) {
            devScreeningRoundCandidates.push({ ...v });
          } 
        });
        setAllCandidates(res.data.candidates);
        setcandidateDevScreeningRound(devScreeningRoundCandidates);
        setcandidateFirstRound(firstRoundCandidates);
        setcandidateSecondRound(secondRoundCandidates);
        setcandidateFinalRound(finalRoundCandidates);
        setcandidateOfferedRound(offeredRoundCandidates);
        setcandidateOnBoardRound(onBoardedCandidates);
        setcandidateOnHold(onHoldCandidates);
        setcandidateRejected(rejectedCandidates);
        console.log(res.data.candidates);
      })
      .catch((err) => {
        console.log(err);
      });
    }catch(err){
      console.log(err)
    }
  };

  const fetchEmployee = async () => {
    const usertoken = localStorage.getItem("token");
    await axios
      .get("http://localhost:8000/auth/all-users", { headers: { token: usertoken } })
      .then((res) => {
        const tempObj = {};
        res.data.users.forEach((v) => {
          tempObj[v._id] = v.name;
        });
        setEmployees(tempObj);
        console.log(tempObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="candiText " >
      <ul className="nav nav-tabs"  id="myTab" role="tablist">
        <li className="nav-item " role="presentation">
          <button
            className="nav-link active tabStyle "
            id="applied-tab"
            data-bs-toggle="tab"
            data-bs-target="#applied"
            type="button"
            role="tab"
            aria-controls="applied"
            aria-selected="true"    
          >
            Applied
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="dev-tab"
            data-bs-toggle="tab"
            data-bs-target="#dev"
            type="button"
            role="tab"
            aria-controls="dev"
            aria-selected="false"
            
          >
            DevScreen
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="first-tab"
            data-bs-toggle="tab"
            data-bs-target="#first"
            type="button"
            role="tab"
            aria-controls="first"
            aria-selected="false"
          >
            First Round
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="second-tab"
            data-bs-toggle="tab"
            data-bs-target="#second"
            type="button"
            role="tab"
            aria-controls="second"
            aria-selected="false"
          >
            Second Round
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="final-tab"
            data-bs-toggle="tab"
            data-bs-target="#final"
            type="button"
            role="tab"
            aria-controls="final"
            aria-selected="false"
          >
            Final Round
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="offered-tab"
            data-bs-toggle="tab"
            data-bs-target="#offered"
            type="button"
            role="tab"
            aria-controls="offered"
            aria-selected="false"
          >
            Offered
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="onBoard-tab"
            data-bs-toggle="tab"
            data-bs-target="#onBoard"
            type="button"
            role="tab"
            aria-controls="onBoard"
            aria-selected="false"
          >
            OnBoarded
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="rejected-tab"
            data-bs-toggle="tab"
            data-bs-target="#rejected"
            type="button"
            role="tab"
            aria-controls="rejected"
            aria-selected="false"
          >
            Rejected
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link tabStyle"
            id="onHold-tab"
            data-bs-toggle="tab"
            data-bs-target="#onHold"
            type="button"
            role="tab"
            aria-controls="onHold"
            aria-selected="false"
          >
            OnHold
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
      <div
          className="tab-pane fade show active"
          id="applied"
          role="tabpanel"
          aria-labelledby="applied-tab"
        >
          <CandidateTabel candidateList1={allCandidates} /> 
        </div>
        <div
          className="tab-pane fade show "
          id="dev"
          role="tabpanel"
          aria-labelledby="dev-tab"
        >
          <CandidateTabel candidateList1={candidateDevScreeningRound} />
        </div>
        <div
          className="tab-pane fade"
          id="first"
          role="tabpanel"
          aria-labelledby="first-tab"
        >
           <CandidateTabel candidateList1={candidateFirstRound} />
        </div>
        <div
          className="tab-pane fade"
          id="second"
          role="tabpanel"
          aria-labelledby="second-tab"
        >
           <CandidateTabel candidateList1={candidateSecondRound}/>
        </div>
        <div
          className="tab-pane fade"
          id="final"
          role="tabpanel"
          aria-labelledby="final-tab"
        >
           <CandidateTabel candidateList1={candidateFinalRound}/>
        </div>
        <div
          className="tab-pane fade"
          id="offered"
          role="tabpanel"
          aria-labelledby="offered-tab"
        >
           <CandidateTabel candidateList1={candidateOfferedRound}/>
        </div>
        <div
          className="tab-pane fade"
          id="onBoard"
          role="tabpanel"
          aria-labelledby="onBoard-tab"
        >
           <CandidateTabel candidateList1={candidateOnBoardRound}/>
        </div>
        <div
          className="tab-pane fade"
          id="onHold"
          role="tabpanel"
          aria-labelledby="onHold-tab"
        >
           <CandidateTabel candidateList1={candidateOnHold}/>
        </div>
        <div
          className="tab-pane fade"
          id="rejected"
          role="tabpanel"
          aria-labelledby="rejected-tab"
        >
           <CandidateTabel candidateList1={candidateRejected}/>
        </div>
      </div>
      <UserCandidate/>
      
    </div>
  );
}
export default Candidatelist;
