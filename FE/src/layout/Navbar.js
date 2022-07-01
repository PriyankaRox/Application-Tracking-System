import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";


function Navbar({ show, toggleSidebar }) {
  let navigate = useNavigate();
  const [loginuser, setLoginuser] = useState([]);

  useEffect(()=>{
    loginUser();
  },[]);

  const loginUser = async () =>{
   try{
    const s =  localStorage.getItem("authuser");
    const users = JSON.parse(s);
    setLoginuser(users.name)
    //console.log(setLoginuser);
   }catch(err){
     console.log(err);
   }
  }

  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("authuser", "");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "#D6DBDF",
        filter: "drop-shadow(8px 8px 10px gray)",
      }}
    >
      <div className="container-fluid">
        <button type="button" className="btn btn-dark" onClick={toggleSidebar}>
          {show === "show" ? (
            <i className="bi bi-arrow-left"></i>
          ) : (
            <i className="bi bi-arrow-right"></i>
          )}
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ marginLeft: 15 }}
          >
            <li className="nav-item">
            <img src={require('./spaklogo.png')} className="logo" alt="logo"/>
              </li>
          </ul>

          <ul className="navbar-nav">
            
            <li className="nav-item">
              <NavLink to="/password-reset">
                <button type="button" className="btn btn-outline-primary mr-rg">
                  <i class="bi bi-person-heart mr-rg"></i>
                  <b> {loginuser}'s </b> Account
                </button>
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-danger mr-rg"
                onClick={logout}
              >
                Logout
                <i class="bi bi-reply-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
