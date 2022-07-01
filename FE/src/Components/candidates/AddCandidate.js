import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCandidate() {
  let navigate = useNavigate();
  const [formName, setName] = useState("");
  const [formEmail, setEmail] = useState("");
  const [formPhone, setPhone] = useState("");
  const [formTotalexp, setTotalexp] = useState("");
  const [formRelavantexp, setRelavantexp] = useState("");
  const [formJobid, setJobid] = useState("");
  const [formcurrentCtc, setcurrentCtc] = useState("");
  const [formexpectedCtc, setexpectedCtc] = useState("");
  const [formnoticePeriod, setnoticePeriod] = useState("");
  const [formExpertise, setExpertise] = useState("");
  const [formResume, setResume] = useState("");
  const [formUser, setFormUser] = useState();
  const [formStatus, setFormStatus] = useState("");
  const [activeJobs, setactiveJobs] = useState([]);
  const [formRole, setFormRole] = useState("");
  const [message, setMessage] = useState([]);
  const [HRs, setHRs] = useState([]);
  const [NonHRs, setNonHRs] = useState([]);
  const [label, setlabel] = useState(false);
  const [empty, setempty] = useState(false);
  const [evalid, setevalid] = useState(false);
  const [emailempty, setemailempty] = useState(false);
  const [phone, setphone] = useState(false);
  const [phoneempty, setphoneempty] = useState(false);
  const [ctc, setctc] = useState(false);
  const [emptyctc, setemptyctc] = useState(false);
  const [expertise, setexpertise] = useState(false);
  const [emptyexpertise, setemptyexpertise] = useState(false);
  const [emptyresume, setemptyresume] = useState(false);
  const [empemploye, setempemploye] = useState(false);
  const [emptyjob, setemptyjob] = useState(false);
  const [expectedctcmin, setexpectedctcmin] = useState(false);
  const [emptyhr, setemptyhr] = useState(false);
  useEffect(() => {
    fetchActiveJob();
  }, []);
  const fetchActiveJob = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/job/all-jobs", {
        headers: { token: usertoken },
      })
      .then((res) => {
        console.log(res);
        console.log(activeJobs);
        setactiveJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/auth/all-users", {
        headers: { token: usertoken },
      })
      .then((res) => {
        console.log(res);
        const allHRs = res.data.users.filter((v) => v.position === "HR");
        const allNonHRs = res.data.users.filter((v) => v.position !== "HR");
        setHRs(allHRs);
        setNonHRs(allNonHRs);
        // console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileChange = (e) => {
    setResume(e.target.files[0]);
  };
  const newCandidate = async (e) => {
    try {
      e.preventDefault();
      if (
        formName &&
        formEmail &&
        formPhone &&
        formJobid &&
        formexpectedCtc &&
        formExpertise &&
        formResume &&
        formUser &&
        formRole 
      ) {
        const usertoken = localStorage.getItem("token");
        setFormStatus("loading");
        const formData = new FormData();
        formData.append("name", formName);
        formData.append("email", formEmail);
        formData.append("phone", formPhone);
        formData.append("totalExperience", formTotalexp || "0");
        formData.append("relavantExperience", formRelavantexp || "0");
        formData.append("jobid", formJobid);
        formData.append("currentCtc", formcurrentCtc || "0");
        formData.append("expectedCtc", formexpectedCtc);
        formData.append("noticePeriod", formnoticePeriod || "0");
        formData.append("expertise", formExpertise);
        formData.append("resume", formResume);
        formData.append("devScreeningEmpId", formUser);
        formData.append("hrID", formRole);
        formData.append("hrScreeningMessage", message );
        console.log(formResume);
        console.log(formUser);
        const apiData = await axios.post(
          "http://localhost:8000/candidate/add-candidate",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: usertoken,
            },
          }
        );

        console.log(apiData);

        if (apiData.status === 200) {
          alert("Candidate added successfully");
          console.log(
            "candidate added successfull",

            apiData.data.user
          );
        } else {
          window.alert(apiData.data.message);
        }
      }
    } catch (err) {
      console.log(err, "hello");
      setFormStatus("error");
    }
    navigate("/candidate-list");
  };
  function Validate() {
    var e = document.getElementById("dropdownMenu1");
    var strUser = e.options[e.selectedIndex].value;

    var strUser1 = e.options[e.selectedIndex].text;
    if (strUser === "") {
      setemptyjob(true);
    } else {
      setemptyjob(false);
    }
  }
  
  function EmpValidate() {
    var e = document.getElementById("dropdownMenu1");
    var strUser = e.options[e.selectedIndex].value;

    var strUser1 = e.options[e.selectedIndex].text;
    if (strUser === "") {
      setempemploye(true);
    } else {
      setempemploye(false);
    }
  }
  function Hrvalidate() {
    var e = document.getElementById("dropdownMenu1");
    var strUser = e.options[e.selectedIndex].value;

    var strUser1 = e.options[e.selectedIndex].text;
    if (strUser === "") {
      setemptyhr(true);
    } else {
      setemptyhr(false);
    }
  }
  return (

    <form style={{ marginTop: "2em" }}>
      <div className="shadow p-4 mb-8 bg-white">
        <div className="form-group border-info mb-2">
          <h3 className="text-center font-weight-bold text-color">
          <u>Add Candidate</u> <i class="bi bi-person-plus"></i>
          </h3>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2 text-color required">Full name </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setempty(false);
                  if (e.target.value.match(/(.*[a-zA-Z]){3}([^0-9]*)$/i)) {
                    console.log("Done");
                    setlabel(false);
                  } else {
                    console.log("Invalid");
                    setlabel(true);
                  }
                } else {
                  setempty(true);
                }
              }}
            />
            {empty === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label === true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Email</h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemailempty(false);
                  if (
                    e.target.value.match(
                      /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/
                    )
                  ) {
                    console.log("Done");
                    setevalid(false);
                  } else {
                    console.log("Invalid");
                    setevalid(true);
                  }
                } else {
                  setemailempty(true);
                }
              }}
            />
            {emailempty === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {evalid === true ? (
              <p style={{ color: "red" }}> Please Enter Valid Email Address </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Contact no</h6>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Contact number"
              onChange={(e) => setPhone(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setphoneempty(false);
                  if (e.target.value.match(/^[6-9]{1}[0-9]{9}$/)) {
                    console.log("Done");
                    setphone(false);
                  } else {
                    console.log("Invalid");
                    setphone(true);
                  }
                } else {
                  setphoneempty(true);
                }
              }}
            />
            {phoneempty === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {phone === true ? (
              <p style={{ color: "red" }}> Please Enter Valid Phone Number </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color ">Total Exp</h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Total experience"
              onChange={(e) => setTotalexp(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color">Relavant Exp</h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Relavant experience"
              onChange={(e) => setRelavantexp(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color">Current Ctc</h6>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              placeholder="Current Ctc"
              onChange={(e) => setcurrentCtc(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Expected Ctc</h6>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Expected CTC"
              onChange={(e) => setexpectedCtc(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyctc(false);
                  if (e.target.value >= 200000) {
                    setexpectedctcmin(false);
                  } else {
                    setexpectedctcmin(true);
                  }
                  if (e.target.value.match(/^[0-9]{1,8}$/)) {
                    console.log("Done");
                    setctc(false);
                  } else {
                    console.log("Invalid");
                    setctc(true);
                  }
                } else {
                  setemptyctc(true);
                }
              }}
            />
            {emptyctc === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {ctc === true ? (
              <p style={{ color: "red" }}> Please Enter Proper CTC </p>
            ) : (
              false
            )}
            {expectedctcmin === true ? (
              <p style={{ color: "red" }}> Minimum More then 200000 </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color">Notice period</h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Notice Period"
              onChange={(e) => setnoticePeriod(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Expertise</h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Expertise"
              onChange={(e) => setExpertise(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyexpertise(false);
                  if (e.target.value.match(/[a-z,A-Z,+]+$/)) {
                    console.log("Done");
                    setexpertise(false);
                  } else {
                    console.log("Invalid");
                    setexpertise(true);
                  }
                } else {
                  setemptyexpertise(true);
                }
              }}
            />
            {emptyexpertise === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {expertise === true ? (
              <p style={{ color: "red" }}> Please Enter Valid Expertise </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Resume</h6>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control"
              placeholder="Upload Resume"
              required="true"
              onChange={(e) => onFileChange(e)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptyresume(false);
                } else {
                  setemptyresume(true);
                }
              }}
            />
            {setemptyresume === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Select Job</h6>
          <div className="col-sm-10">
            <select
              className="select form-select form-select"
              style={{ width: "400px" }}
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setJobid(e.target.value)}
              onBlur={(e) => Validate(e)}
            >
              <option value="">Select</option>
              {activeJobs.length &&
                activeJobs.map((v) => {
                  return (
                    <option value={v._id}>
                      {v.title} - {v.jobid}
                    </option>
                  );
                })}
            </select>
            {emptyjob === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color  required">Select HR</h6>
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
              onBlur={(e) => Hrvalidate(e)}
            >
              <option value="">Select</option>
              {HRs.length &&
                HRs.map((v) => {
                  return <option value={v._id}>{v.name}</option>;
                })}
            </select>
            {emptyhr === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">Select Employee</h6>
          <div className="col-sm-10">
            <select
              className="select form-select form-select"
              style={{ width: "400px" }}
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setFormUser(e.target.value)}
              onBlur={(e) => EmpValidate(e)}
            >
              <option value="">Select</option>
              {NonHRs.length &&
                NonHRs.map((v) => {
                  return <option value={v._id}>{v.name}</option>;
                })}
            </select>
            {empemploye === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-sm-2  text-color required">
            HR Screening Message
          </h6>
          <div className="col-sm-10">
            <textarea
              style={{ width: "800px", height: "100px" }}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="d-grid gap-2 col-2 mx-auto">
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            variant="info"
            onClick={(e) => newCandidate(e)}
          >
            Add candidate
          </button>
        </div>
      </div>
    </form>
  );
}
export default AddCandidate;
