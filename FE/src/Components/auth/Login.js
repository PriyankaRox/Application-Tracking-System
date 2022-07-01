import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const [formEmail, setemail] = useState("");
  const [formPassword, setpassword] = useState("");

  const [formStatus, setFormStatus] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formEmail && formPassword) {
        const formData = {
          email: formEmail,
          password: formPassword,
        };
        const apiData = await axios.post(
          "http://localhost:8000/auth/login",
          formData
        );
        console.log(apiData);
        setFormStatus(apiData.data.message);
        if (
          apiData.status === 200 &&
          apiData.data.message === "User login successful"
        ) {
          console.log(
            "login successfull",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("Invalid Email or Password");
    }
  };

  return (
    <div className="bgImage">
      <div className="auth-wrapper">
        <div className="auth-formContent">
          <h3>
            <b className="logtext">SignUp</b>
          </h3>
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend form-extended">
                <span className="logtext">Email</span>
              </div>
              <input
                type="email"
                className="form-control"
                value={formEmail}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend form-extended">
                <span className="logtext">Password</span>
              </div>
              <input
                type="password"
                className="form-control"
                value={formPassword}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <b style={{ color: "red", marginBottom: "8em" }}>{formStatus}</b>{" "}
            <br />
            <div>
              <button className="logbutton" onClick={(e) => onSubmit(e)}>
                Log in
              </button>
            </div>
          </form>

          <div className="auth-formfooter">
            <Link to="/forget-password" style={{ color: "white" }}>
              Forget Password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
