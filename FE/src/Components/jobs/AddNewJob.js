import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function AddNewJob() {
  let navigate = useNavigate();
  const [formjobid, setjobid] = useState("");
  const [formtitle, settitle] = useState("");
  const [formdescription, setdescription] = useState("");
  const [formexperience, setexperience] = useState("");
  const [formtechStack, settechStack] = useState("");
  const [formqualification, setqualification] = useState("");
  const [formnoticePeriod, setnoticePeriod] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [formRole, setFormRole] = useState("");
  const [role, setRole] = useState([]);
  const [job, setjob] = useState(false);
  const [emptyjob, setemptyjob] = useState(false);
  const [titlev, settitlev] = useState(false);
  const [emptytitle, setemptytitle] = useState(false);
  const [jobD, setjobD] = useState(false);
  const [emptyjobD, setemptyjobD] = useState(false);
  const [experiencev, setexperiencev] = useState(false);
  const [emptyexperience, setemptyexperience] = useState(false);
  const [techstackv, settechStackv] = useState(false);
  const [emptytechstack, setemptytechstack] = useState(false);
  const [noticev, setnoticev] = useState(false);
  const [nempty, setnempty] = useState(false);

  //fetch role
  useEffect(() => {
    fetchHrRole();
  }, []);
  const usertoken = localStorage.getItem("token");
  const fetchHrRole = () => {
    axios
      .get("http://localhost:8000/auth/view-all-user/HR", {
        headers: { token: usertoken },
      })
      .then((res) => {
        setRole(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newjob = async (e) => {
    try {
      e.preventDefault();
      if (
        formjobid &&
        formtitle &&
        formdescription &&
        formtechStack 
      ) {
        const usertoken = localStorage.getItem("token");
        setFormStatus("loading");
        const formData = {
          jobid: formjobid,
          title: formtitle,
          description: formdescription,
          experience: formexperience || "0",
          techStack: formtechStack,
          qualification: formqualification || "0",
          noticePeriod: formnoticePeriod || "0",
          hrID: formRole || "0",
        };
        const apiData = await axios.post(
          "http://localhost:8000/job/add-newjob",
          formData,
          { headers: { token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.message);
        if (
          apiData.status === 200 &&
          apiData.data.message === "Job added successful"
        ) {
          console.log(
            "Job added Successfully",
            apiData.data.token,
            apiData.data.user
          );

          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
        }
        navigate("/view-card-new-job");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };
  return (
    <form style={{ marginTop: "2em" }}>
      <div className="shadow p-4 mb-8 bg-white">
        <div className="form-group border-info mb-3">
          <h3 className="text-center font-weight-bold text-color">
            Add new Job
          </h3>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">JobID </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="job ID"
              onChange={(e) => setjobid(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyjob(false);
                  if (e.target.value.match(/(.*[a-zA-Z,0-9]){3}([^0-9]*)$/i)) {
                    console.log("Done");
                    setjob(false);
                  } else {
                    console.log("Invalid");
                    setjob(true);
                  }
                } else {
                  setemptyjob(true);
                }
              }}
            />
            {emptyjob == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {job == true ? (
              <p style={{ color: "red" }}> Please Enter Proper Job ID </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Title </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="title"
              onChange={(e) => settitle(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptytitle(false);
                  if (e.target.value.match(/(.*[a-zA-Z]){3}([^0-9]*)$/i)) {
                    console.log("Done");
                    settitlev(false);
                  } else {
                    console.log("Invalid");
                    settitlev(true);
                  }
                } else {
                  setemptytitle(true);
                }
              }}
            />
            {emptytitle == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {titlev == true ? (
              <p style={{ color: "red" }}> Please Enter Proper Title</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2 text-color required">Job description</h6>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              rows="5"
              placeholder="job description"
              id="jobdesciption"
              onChange={(e) => setdescription(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyjobD(false);
                  if (e.target.value.match(/(.*[a-zA-Z,0-9]){10}([^0-9]*)$/i)) {
                    console.log("Done");
                    setjobD(false);
                  } else {
                    console.log("Invalid");
                    setjobD(true);
                  }
                } else {
                  setemptyjobD(true);
                }
              }}
            ></textarea>

            {emptyjobD == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {jobD == true ? (
              <p style={{ color: "red" }}>
                {" "}
                Please Enter Proper JOB Description
              </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color ">Experience </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="experience"
              onChange={(e) => setexperience(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Tech Stack </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="tech stack"
              onChange={(e) => settechStack(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptytechstack(false);
                  if (e.target.value.match(/[a-zA-Z0-9,.]+$/)) {
                    console.log("Done");
                    settechStackv(false);
                  } else {
                    console.log("Invalid");
                    settechStackv(true);
                  }
                } else {
                  setemptytechstack(true);
                }
              }}
            />
            {emptytechstack == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {techstackv == true ? (
              <p style={{ color: "red" }}> Please Enter Valid Techstack</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2 text-color">Qualification </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="qualification"
              onChange={(e) => setqualification(e.target.value)}
              
            />
            

            
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color ">Min notice period </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="minimum notice period"
              onChange={(e) => setnoticePeriod(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2 text-color required">Select HR</h6>
          <div className="col-sm-10">
            <select
              className="select form-select form-select"
              style={{ width: "400px" }}
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setFormRole(e.target.value)}
            >
              <option value="">Select</option>
              {role.length &&
                role.map((v) => {
                  return <option value={v._id}>{v.name}</option>;
                })}
            </select>
          </div>
        </div>
        <div className="d-grid gap-2 col-2 mx-auto">
          <p> </p>
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            variant="info"
            onClick={(e) => newjob(e)}
          >
            Create job opening
          </button>
        </div>
      </div>
    </form>
  );
}
export default AddNewJob;
