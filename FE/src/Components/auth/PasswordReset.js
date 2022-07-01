import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

function PasswordReset() {
  const [formOldPassword, setOldPassword] = useState("");
  const [formNewPassword, setNewPassword] = useState("");
  const [formConfirmPassword, setConfirmPassword] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [oldpasswordempty, setoldpasswordempty] = useState(false);
  const [emptynewpassword, setemptynewpassword] = useState(false);
  const [econfirmpassword, seteconfirmpassword] = useState(false);
  const [confirmpasswordv, setconfirmpasswordv] = useState(false);
  const [confirmnewv, setconfirmnewv] = useState(false);
  const [mismatch, setmismatch] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
      if (formNewPassword !== formOldPassword) {
        if (formNewPassword === formConfirmPassword) {
          const jsonData = JSON.parse(localStorage.getItem("authuser"));
          const data = {
            loginid: jsonData.id,
            newPassword: formNewPassword,
            oldpassword: formOldPassword,
          };
          console.log(jsonData.id);
          const usertoken = localStorage.getItem("token");
          const apiData = await axios.post(
            "http://localhost:8000/auth/password-reset",
            data,
            { headers: { token: usertoken } }
          );
          console.log(apiData);
          window.alert(apiData.data.message);
          if (
            apiData.status === 200 &&
            apiData.data.message === "Password Matching"
          ) {
            console.log(apiData.data.token, apiData.data.user);
          }
        } else {
          alert("Password Mismatch");
        }
      } else {
        alert("Old Password and New Password are Same");
      }
    // } catch (err) {
    //   setFormStatus("error");
    // }
  };

  return (
    <form style={{ marginTop: "2em" }}>
      <div class="shadow p-4 mb-8 bg-white">
        <div className="form-group border-info mb-3">
          <h3 className="text-center font-weight-bold textEmp">
            Password Reset
          </h3>
        </div>
        <div class="mb-3 row">
          <h6 class="col-2 textPass">Old Password </h6>
          <div class="col-sm-8">
            <input
              type="password"
              className="form-control"
              placeholder="old password"
              name="OldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setoldpasswordempty(false);
                } else {
                  setoldpasswordempty(true);
                }
              }}
            />
            {oldpasswordempty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div class="mb-3 row">
          <h6 class="col-2  textPass">New Password </h6>
          <div class="col-sm-8">
            <input
              type="password"
              className="form-control"
              placeholder="new password"
              name="NewPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setemptynewpassword(false);
                  if (
                    e.target.value.match(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                    )
                  ) {
                    console.log("Done");
                    setconfirmnewv(false);
                  } else {
                    console.log("Invalid");
                    setconfirmnewv(true);
                  }
                } else {
                  setemptynewpassword(true);
                }
              }}
            />
            {confirmnewv == true ? (
              <p style={{ color: "red" }}>
                {" "}
                Minimum eight characters, at least one letter, one number and
                one special character
              </p>
            ) : (
              false
            )}
            {emptynewpassword == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div class="mb-3 row">
          <h6 class="col-2  textPass">Confirm Password </h6>
          <div class="col-sm-8">
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              name="ConfirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  seteconfirmpassword(false);
                  if (
                    e.target.value.match(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                    )
                  ) {
                    console.log("Done");
                    setconfirmpasswordv(false);
                  } else {
                    console.log("Invalid");
                    setconfirmpasswordv(true);
                  }
                } else {
                  seteconfirmpassword(true);
                }
              }}
            />
            {confirmpasswordv == true ? (
              <p style={{ color: "red" }}>
                {" "}
                Minimum eight characters, at least one letter, one number and
                one special character
              </p>
            ) : (
              false
            )}
            {econfirmpassword == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
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
            onClick={(e) => onSubmit(e)}
          >
            RESET
          </button>
        </div>
      </div>
    </form>
  );
}

export default PasswordReset;
