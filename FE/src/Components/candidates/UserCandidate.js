import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

function UserCandidate(props) {
    // console.log('loading');
  const [userRole, setuserRole] = useState({});

  useEffect(() => {
    ccc();
  },[]);

  const ccc = async () => {
    const usertoken = await localStorage.getItem("token");
    const res = await axios.get("http://localhost:8000/candidate/user-candidate",{ headers: { token: usertoken } })
        //res.data.candidates
        const userdata = JSON.parse(JSON.stringify(res.data));
        console.log("pink",userdata);
        setuserRole(userdata);
        console.log("pink",userRole);
  };
    return (
        <div>
            
        </div>
    );
}

export default UserCandidate;