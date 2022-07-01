import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Card.css"
import SimpleDateTime  from 'react-simple-timestamp-to-date';

function ViewJob() {
  //let histroy = useHistory;
  let navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [ status,setStatus] = useState("");
  const [role, setRole] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchHrRole();
    loadJob();
  }, []);

  const viewCandidateList = () =>{
    navigate(`/candidate-list?jobid=${id}`);
  }

  const fetchHrRole = async () => {
    const usertoken = localStorage.getItem("token");
    const res = await axios
      .get("http://localhost:8000/auth/all-users", {
        headers: { token: usertoken },
      })
      .then((res) => {
        const tempObj = {};
        res.data.users.forEach((v) => {
          tempObj[v._id] = v.name;
        });
        setRole(tempObj);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadJob = async () => {
    console.log(id);
    const usertoken = localStorage.getItem("token");
    const result = await axios.get(`http://localhost:8000/job/all-jobs/${id}`,{ headers: { token: usertoken } });
    setJob(result.data);
  };
  
  const updateJobStatus = async (newStatus) => {
    try {
      const data = { jobid: id, newStatus: newStatus };
      const usertoken = localStorage.getItem("token");
      const apiData = await axios.put(
        "http://localhost:8000/job/update-job-status/",
        data , { headers: { token: usertoken } }
      );
      console.log(apiData);
      if (apiData.status === 200 && apiData.data.msg === "update successful") {
        console.log("Job status updated successfully");
        setJob({ ...job, status: newStatus });
      }
    } catch (err) {
      setStatus("error");
    }
  };
  return (
    <div className="shadow p-4 mb-8 bg-white viewjob">
      <h3 className=" text-center font-weight-bold text-color" >View Job</h3>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Title :</label>
        <div className="col-sm-10">{job && job.title ? job.title : "-"}</div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Description :</label>
        <div className="col-sm-10">
          {job && job.description ? job.description : "-"}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Experience :</label>
        <div className="col-sm-10">
          {job && job.experience ? job.experience : "-"}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Tech Stack :</label>
        <div className="col-sm-10">
          {job && job.techStack ? job.techStack : "-"}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Qualification :</label>
        <div className="col-sm-10">
          {job && job.qualification ? job.qualification : "-"}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Notice Period :</label>
        <div className="col-sm-10">
          {job && job.noticePeriod ? job.noticePeriod : "-"}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Created by :</label>
        <div className="col-sm-10">{job && job.hrID ? role[job.hrID] : "-"}</div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Date :</label>
        <div className="col-sm-10"><SimpleDateTime dateSeparator="-" format="MYD" showTime="0">
          {job && job.createdAt ? job.createdAt : "-"}</SimpleDateTime></div>
        
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Status :</label>
        <div className="col-sm-10">{job && job.status ? job.status : "-"}</div>
      </div>
      <button className="btn btn-primary btn-sm btn-space" type="submit"
       onClick={viewCandidateList}>
        View Candidate List
      </button>
      {job && job.status !== "active" && (
        <button
        className="btn btn-success btn-sm btn-space"
          type="submit"
          onClick={() => {
            updateJobStatus("active");
          }}
        >
          Activate job
        </button>
      )}

      {job && job.status !== "pause" && (
        <button
        className="btn btn-warning btn-sm btn-space"
          type="submit"
          onClick={() => {
            updateJobStatus("pause");
          }}
        >
          Pause job
        </button>
      )}

      {job && job.status !== "inactive" && (
        <button
        className="btn btn-danger btn-sm btn-space"
          type="submit"
          onClick={() => {
            updateJobStatus("inactive");
          }}
        >
          Close job
        </button>
      )}
    </div>
  );
}
export default ViewJob;
