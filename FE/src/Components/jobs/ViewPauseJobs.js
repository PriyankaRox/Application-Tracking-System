import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Card.css";
import Pagination from "../common/Pagination";
import { paginate } from "../../utils/paginate";

function ViewPauseJobs() {
  const [pauseJobs, setpauseJobs] = useState([]);
  const [role, setRole] = useState([]);
  const [pagesize, setpagesize] = useState(6);
  const [currentpage, setcurrentpage] = useState(1);

  const handlePageChange = (pageNo) => {
    setcurrentpage(pageNo);
  };
  const pauseJob = paginate(pauseJobs, currentpage, pagesize);

  useEffect(() => {
    fetchHrRole();
    fetchPauseJobs();
  }, []);

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

  const fetchPauseJobs = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/job/view-all-jobs/pause", {
        headers: { token: usertoken },
      })
      .then((res) => {
        setpauseJobs(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <h3 className="text-center font-weight-bold text-color">Jobs on hold</h3>
      <div className="item-container">
        {pauseJob.map((v) => (
          <div className="card" key={v._id}>
            <p>JobID : {v.jobid}</p>
            <p>Title : {v.title}</p>
            <p>Created by : {role[v.hrID] ? role[v.hrID] : "-"}</p>
            <Link to={`/view-job/${v._id}`}>
              <button color="white" className="btn btn-primary btn-sm">
                <span>View</span>
              </button>
            </Link>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="page">
        <Pagination
          lenght={pauseJobs.length}
          pagesize={pagesize}
          onChange={handlePageChange}
          currentpage={currentpage}
        />
      </div>
    </div>
  );
}
export default ViewPauseJobs;
