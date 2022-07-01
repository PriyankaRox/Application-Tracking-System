import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { paginate } from "./../../utils/paginate";
import Pagination from "./../common/Pagination";

function Dashboard() {
  const [activejobs, setactivejobs] = useState([]);
  const [role, setRole] = useState([]);
  const [pagesize, setpagesize] = useState(6);
  const [currentpage, setcurrentpage] = useState(1);

  const handlePageChange = (pageNo) => {
    setcurrentpage(pageNo);
  };
  const activejob = paginate(activejobs, currentpage, pagesize);

  useEffect(() => {
    fetchHrRole();
    fetchJobs();
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

  const fetchJobs = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/job/all-jobs", {
        headers: { token: usertoken },
      })
      .then((res) => {
        console.log(res);
        setactivejobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2
        className="text-center"
        style={{
          fontFamily: "Times New Roman, serif",
          color: "#2471A3",
          marginTop: "19px",
          filter: "drop-shadow(8px 8px 10px gray)",
        }}
      >
        <b>
          Welcome to SpakCruiter<i class="bi bi-exclamation-lg"></i>
        </b>
      </h2>
      <br />
      <div>
        <div className="item-container ">
          {activejob.map((v) => (
            <div className="card move-on-hover" key={v._id}>
              <img
                className="rounded mx-auto d-block"
                style={{ width: "250px", height: "150px" }}
                alt=""
                src="https://sdacademy.pl/sda-assets/uploads/2021/10/WEB-DEVELOPMENT-s-1.png"
              />
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
      </div>
      <br />
      <div  className="page">
      <Pagination
        lenght={activejobs.length}
        pagesize={pagesize}
        onChange={handlePageChange}
        currentpage={currentpage}
      /></div>
    </div>
  );
}

export default Dashboard;
