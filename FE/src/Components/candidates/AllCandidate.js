import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./candidate.css";

export default function AllCandidate() {
  const [candidateList, setcandidatelist] = useState([]);
  const [employees, setEmployees] = useState({});

  useEffect(() => {
    fetchEmployee();
    fetchCandidates();
  }, []);
  const fetchCandidates = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/candidate/candidate-list",{ headers: { token: usertoken } })
      .then((res) => {
        //res.data.candidates
        setcandidatelist(res.data.candidates);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchEmployee = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/auth/all-users",{ headers: { token: usertoken } })
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
    <div>
      <h3 style={{marginTop:"em"}}>Candidate List</h3>
      <table
        className="table table-hover table-striped candiBox"
        style={{ marginTop: "0em", borderSpacing: "2em" }}
      >
        <thead>
          <tr>
            <th>Slno</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Expertise</th>
            <th>Experience</th>
            <th> Employee</th>
            <th>Last Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidateList.length &&
            candidateList.map((v, index) => (
              <tr key={v.id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/view-candidate/${v._id}`}
                  >
                    {v.name}
                  </Link>
                </td>
                <td>{v.phone}</td>
                <td>{v.email}</td>
                <td>{v.expertise}</td>
                <td>{v.totalExperience}</td>
                <td>
                  {employees[v.devScreeningEmpId]
                    ? employees[v.devScreeningEmpId]
                    : "-"}
                </td>
                <td>-</td>
                <td>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>{" "}
                  <button type="button" class="btn btn-primary">
                    Edit
                  </button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
