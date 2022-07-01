import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployee() {
  let navigate = useNavigate();
  const [formName, setName] = useState("");
  const [formEmail, setEmail] = useState("");
  const [formPassword, setPassword] = useState("");
  const [formPosition, setPosition] = useState("");
  const [formUserType, setUserType] = useState("");

  const [label, setlabel] = useState(false);
  const [empty, setempty] = useState(false);
  const [evalid, setevalid] = useState(false);
  const [emailempty, setemailempty] = useState(false);
  const [password, setpassword] = useState(false);
  const [passwordempty, setpasswordempty] = useState(false);
  const [emptyposition, setemptyposition] = useState(false);

  const [formStatus, setFormStatus] = useState("");

  const addEmployee = async (e) => {
    try {
      e.preventDefault();
      if (formName && formEmail && formPassword && formPosition) {
        const usertoken = localStorage.getItem("token");
        setFormStatus("loading");
        const formData = {
          name: formName,
          email: formEmail,
          password: formPassword,
          position: formPosition,
          userType: formUserType,
        };
        const apiData = await axios.post(
          "http://localhost:8000/auth/adduser",
          formData,
          { headers: { token: usertoken } }
        );

        console.log(apiData);
        window.alert(apiData.data.message);
        if (
          apiData.status === 200 &&
          apiData.data.message === "employee added successful"
        ) {
          console.log(
            "employee added successfull",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
        }
        navigate("/view-employee");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };
  function Validate() {
    var e = document.getElementById("dropdownMenu1");
    console.log(e);
    var strUser = e.options[e.selectedIndex].value;

    var strUser1 = e.options[e.selectedIndex].text;
    console.log(strUser);
    if (strUser === "select here") {
      setemptyposition(true);
    } else {
      setemptyposition(false);
    }
  }

  return (
    <form style={{ marginTop: "2em" }}>
      <div className="shadow p-4 mb-8 bg-white">
        <div className="form-group border-info mb-3">
          <h3 className="text-center font-weight-bold textEmp">
            Add new Employee
          </h3>
        </div>
        <div className="mb-3 row">
          <h6 className="col-1  textEmp">Name </h6>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              required={true}
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

            {empty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label == true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </div>
        </div>

        <div className="mb-3 row dropdown">
          <h6 className="col-1  textEmp">Position </h6>
          <div className="col-sm-10">
            <select
              className="select form-select form-select"
              style={{ width: "400px" }}
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setPosition(e.target.value)}
              onBlur={(e) => Validate(e)}
            >
              <option>select here</option>
              <option value="HR">HR</option>
              <option value="Fullstack Developer">Fullstack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Automation Test Engineer">
                Automation Test Engineer
              </option>
            </select>
            {emptyposition == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>

        <div className="mb-3 row dropdown">
          <h6 className="col-1  textEmp">Usertype </h6>
          <div className="col-sm-10">
            <select
              className="select form-select form-select"
              style={{ width: "400px" }}
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setUserType(e.target.value)}
              onBlur={(e) => Validate(e)}
            >
              <option>select here</option>
              <option value="1">1-HR/COX</option>
              <option value="2">2-Employee</option>
              <option value="3">3-Guest</option>
            </select>
            {emptyposition == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-1  textEmp">Emailid</h6>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemailempty(false);
                  if (
                    e.target.value.match(
                      /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@spakengineering\.com$/
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
            {emailempty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {evalid == true ? (
              <p style={{ color: "red" }}> Please Enter Valid Email Address </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-1  textEmp">Password </h6>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setpasswordempty(false);
                  if (
                    e.target.value.match(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                    )
                  ) {
                    console.log("Done");
                    setpassword(false);
                  } else {
                    console.log("Invalid");
                    setpassword(true);
                  }
                } else {
                  setpasswordempty(true);
                }
              }}
            />
            {passwordempty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {password == true ? (
              <p style={{ color: "red" }}>
                Minimum eight characters, at least one letter, one number and
                one special character
              </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="d-grid gap-2 col-2 mx-auto">
          <p> </p>
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            variant="info"
            onClick={(e) => addEmployee(e)}
          >
            Add Employee
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddEmployee;
