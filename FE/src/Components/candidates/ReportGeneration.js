import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';

function ReportGeneration() {
    const [socialName, setsocialName]= useState([]);
    const [socialValue, setSocialValue]= useState([]);
  
    useEffect( ()=>{
  
      const socialMedianame=[];
      const socialMedivalue=[];
  
      const getSocialrecord= async()=>{
        const usertoken = localStorage.getItem("token");
        const dataReq= await fetch("http://localhost:8000/candidate/candidate-list",{
            headers: { token: usertoken },
          });
        const dataRes= await dataReq.json();
        //console.log(dataRes);
  
        for(let i=0; i<dataRes.length; i++)
        {
          socialMedianame.push(dataRes[i].name);
          socialMedivalue.push(dataRes[i].email);
        }
        setsocialName(socialMedianame);
        setSocialValue(socialMedivalue);
   }
    getSocialrecord();
  
    },[]);
    
    return (
      <React.Fragment>
        <div className="container-fluid mb-5">
          <h3 className="text-center mt-3 mb-3">Report Analysis</h3>
        
          <Chart
            type="bar"
            width={900}
            height={400}
            series={[
              {
                name: "Candidate",
                data: socialValue,
              },
            ]}
            options={{
              title: {
                text: "BarChart",
                style: { fontSize: 30 },
              },
  
              subtitle: {
                text: "-",
                style: { fontSize: 18 },
              },
  
              colors: ["#f90000"],
              theme: { mode: "light" },
  
              xaxis: {
                tickPlacement: "on",
                categories: socialName,
                title: {
                  text: "Candidate data",
                  style: { color: "#f90000", fontSize: 30 },
                },
              },
  
              yaxis: {
                  labels: {
                    formatter: (val) => {
                    return `${val}`;
                    },
                  style: { fontSize: "15", colors: ["#f90000"] },
                },
                   title: {
                   text: "No of candidates",
                   style: { color: "#f90000", fontSize: 15 },
                },
              },
  
              legend: {
                show: true,
                position: "right",
              },
  
              dataLabels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: {
                  colors: ["#f4f4f4"],
                  fontSize: 15,
                },
              },
            }}
          ></Chart>
        </div>
      </React.Fragment>
    );
}
export default ReportGeneration;
