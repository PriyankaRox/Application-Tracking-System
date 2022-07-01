import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./layout/PrivateRoute";

import Login from "./Components/auth/Login";
import Dashboard from "./Components/dashboard";
import AddEmployee from "./Components/employees/AddEmployee";
import AddNewJob from "./Components/jobs/AddNewJob";
import JobOpening from "./Components/jobs/JobOpening";
import ViewJob from "./Components/jobs/ViewJob";
import ViewInActiveJobs from "./Components/jobs/ViewInActiveJobs";
import ViewPauseJobs from "./Components/jobs/ViewPauseJobs";
import ViewEmployee from "./Components/employees/ViewEmployee";
import AddCandidate from "./Components/candidates/AddCandidate";
import ViewCandidate from "./Components/candidates/ViewCandidate";
import Candidatelist from "./Components/candidates/CandidateList";
import PasswordReset from "./Components/auth/PasswordReset";
import DevCard from "./Components/candidates/DevCard";
import AddReferral from "./Components/referral/AddReferral";
import DevResumeScreening from "./Components/candidates/DevResumeScreening";
import ForgetPassword from "./Components/auth/ForgetPassword";
import OtpForm from "./Components/auth/OtpForm";
import ReportGeneration from "./Components/candidates/ReportGeneration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/forget-password" element={<ForgetPassword />}></Route>

          <Route path="/otp-form" element={<OtpForm />}></Route>

          <Route
            path="/password-reset"
            element={<PrivateRoute component={PasswordReset} />}
          />

          <Route
            path="/add-employee"
            element={<PrivateRoute component={AddEmployee} />}
          />
          <Route
            path="/view-employee"
            element={<PrivateRoute component={ViewEmployee} />}
          />

          <Route path="/" element={<PrivateRoute component={Dashboard} />} />

          <Route
            path="/add-candidate"
            element={<PrivateRoute component={AddCandidate} />}
          ></Route>

          <Route
            path="/add-referral"
            element={<PrivateRoute component={AddReferral} />}
          ></Route>

          <Route
            path="/candidate-list"
            element={<PrivateRoute component={Candidatelist} />}
          ></Route>

          <Route
            path="/view-candidate/:id"
            element={<PrivateRoute component={ViewCandidate} />}
          ></Route>

          <Route
            path="/dev-card/:id"
            element={<PrivateRoute component={DevCard} />}
          ></Route>

          <Route
            path="/Dev-Resume-Screening"
            element={<PrivateRoute component={DevResumeScreening} />}
          ></Route>

          <Route
            path="/add-new-job"
            element={<PrivateRoute component={AddNewJob} />}
          ></Route>
          <Route
            path="/view-card-new-job"
            element={<PrivateRoute component={JobOpening} />}
          ></Route>
          <Route
            path="/view-job/:id"
            element={<PrivateRoute component={ViewJob} />}
          ></Route>
          <Route
            path="/inactive-jobs"
            element={<PrivateRoute component={ViewInActiveJobs} />}
          ></Route>
          <Route
            path="/pause-jobs"
            element={<PrivateRoute component={ViewPauseJobs} />}
          ></Route>

          <Route
            path="/report"
            element={<PrivateRoute component={ReportGeneration} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
