import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OtpForm(email) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpEmpty, setOtpEmpty] = useState(false);
  const [newPasswordEmpty, setNewPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const body = document.querySelector("body");

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //if (newPasswordEmpty === confirmPasswordEmpty) {
        const data = {
          email: body.dataset.email,
          otpcode: otp,
          password: newPassword,
          confirmpassword: confirmPassword,
        };
        const usertoken = localStorage.getItem("token");
        const apiData = await axios.post(
          "http://localhost:8000/auth/change-password",
          data,
          { headers: { token: usertoken } }
        );
        console.log(data);
        console.log(body.dataset.email);
        console.log(apiData);
        //window.alert(apiData.data.message);
        //body.dataset.email = null;
        if (apiData.data.message === "password change successfully") {
          window.alert(apiData.data.message);
          navigate("/login");
        } else {
          window.alert(apiData.data.message);
          navigate("/otp-form");
        }
    //   } else {
    //     console.log("Password does not match");
    //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <div className="container right">
        <div className="form-group border-info mb-3">
          <h3 className="font-weight-bold textEmp fp">
            Change <br/>
            Password!
          </h3>
          <br />
        </div>
        <div class="mb-4">
          <h6 class="col-sm-4 textPass ">OTP Code </h6>
          <div class="col-sm-4">
            <input
              type="password"
              className="form-control textPass"
              placeholder="Enter otp"
              name="OldPassword"
              onChange={(e) => setOtp(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setOtpEmpty(false);
                } else {
                  setOtpEmpty(true);
                }
              }}
            /><p style={{color:"green", paddingLeft:"6em"}}> otp expires in 15 mins</p>
            {otpEmpty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div class="mb-4">
          <h6 class="col-sm-4 textPass">New Password </h6>
          <div class="col-sm-4">
            <input
              type="password"
              className="form-control textPass"
              placeholder="Enter password"
              name="OldPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setNewPasswordEmpty(false);
                } else {
                  setNewPasswordEmpty(true);
                }
              }}
            />
            {newPasswordEmpty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div class="mb-4">
          <h6 class="col-sm-4 textPass">Confirm Password </h6>
          <div class="col-sm-4">
            <input
              type="password"
              className="form-control textPass"
              placeholder="Enter password"
              name="OldPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => {
                console.log(e.target.value);
                if (e.target.value !== "") {
                  setConfirmPasswordEmpty(false);
                } else {
                  setConfirmPasswordEmpty(true);
                }
              }}
            />
            {confirmPasswordEmpty == true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>

        <div className="d-grid gap-2 col-2" style={{width: "10px", marginLeft:"4em", paddingLeft:"2em"}} >
        
          <button
            className="btn btn-primary"
            type="submit"
            variant="info"
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
export default OtpForm;
