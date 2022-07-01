import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";


function ForgetPassword() {
  const navigate = useNavigate();
  const [formEmail, setFormEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
          const data = {
            email: formEmail,
          };
          const usertoken = localStorage.getItem("token");
          const apiData = await axios.post(
            "http://localhost:8000/auth/email-send",
            data,
            { headers: { token: usertoken }}
          );
          console.log(apiData);
          if(apiData.data.message === 'Please Check Your Email'){
            window.alert(apiData.data.message);
             navigate("/otp-form");
          }
          else{
            window.alert(apiData.data.message);
            navigate("/forget-password")
          }
          const body = document.querySelector('body');
          body.dataset.email=formEmail
         
  };
  return (
    <form>
      <div className="container right" style={{marginTop:"7em"}}>
      
        <div className="form-group border-info mb-3">
          <h3 className="text font-weight-bold textEmp fp">
            Forgot<br/> 
            Password?
          </h3>
          <br/>
        </div>
        <div class="mb-3">
          <h6 class="col-sm-2 textPass" >Email </h6>
          <div class="col-sm-4">
            <input
              type="email"
              className="form-control textPass"
              placeholder="Enter your email"
              name="OldPassword"
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="d-grid gap-2 col-2" style={{width: "10px", marginLeft:"4em", paddingLeft:"2em"}}>
          <button
            className="btn btn-primary "
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


export default ForgetPassword;