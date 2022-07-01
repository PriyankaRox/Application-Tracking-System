import React , {useState,useEffect}from 'react';
import './navbar-sidebar.css';
import { useNavigate } from "react-router-dom";

import Sidebar from './Sidebar'
import Navbar from './Navbar';

function PrivateRoute({ component: Component, ...rest }) {
  let navigate = useNavigate();
  const [showSidebar , setSidebar] = useState('show')

  useEffect(() => {
    const widthLimit = 700;
    const isMobile = window.innerWidth <= widthLimit;
    if (isMobile){
      setSidebar('')
    }
  }, []);

  useEffect(() => {
    try {
      const usertoken = localStorage.getItem("token");

      const authuser = localStorage.getItem("authuser");
      if (!usertoken || !authuser) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  const toggleSidebar = () => {
    if(showSidebar ==="show"){
      setSidebar("")
    }
    else{
      setSidebar("show")
    }
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar show={showSidebar}/>
        <main className="col ps-md-2 pt-2">
          
          <Navbar show={showSidebar} toggleSidebar={toggleSidebar}/>
          
          <div className="row" style={{margin:5}}>
            <div className="col-12">
              <Component {...rest} />
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}

export default PrivateRoute;
