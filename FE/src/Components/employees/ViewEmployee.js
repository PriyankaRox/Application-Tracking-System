import React, { useState, useEffect } from "react";
import axios from "axios";
import "./emp.css";
import Pagination from './../common/Pagination';
import { paginate } from './../../utils/paginate';

export default function ViewEmployee() {
  const [userList, setUserlist] = useState([]);
  const [pagesize, setpagesize]= useState(8)
  const [currentpage, setcurrentpage]= useState(1)
  const fetchUser = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/auth/all-users", { headers: { token: usertoken } })
      .then((res) => {
        setUserlist(res.data.users);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  
  const handlePageChange = (pageNo)=>{
    setcurrentpage(pageNo)
}
const employe = paginate(userList,currentpage,pagesize);


  return (
    <div style={{ marginTop: "2em" }}>
      <h3 className="text-center textEmp">Spak Team</h3>
      <table className="table " style={{background:"#DCECF7",opacity:"0.8", borderRadius:"10px", boxShadow:"5px 7px #ACB1B3"}}>
        <thead>
          <tr>
            <th>Slno</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employe.length && 
            employe.map((v, index) => (
              <tr key={v.id}>
                <td>{(index+(currentpage-1)*pagesize)+1}</td>
                <td>{v.name}</td>
                <td>{v.position}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div  className="page">
         <Pagination
           lenght={userList.length}
           pagesize={pagesize}
           onChange={handlePageChange}
           currentpage={currentpage} /></div>
    </div>
  );
}
