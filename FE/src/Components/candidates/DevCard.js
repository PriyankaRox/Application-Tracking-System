import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./candidate.css";

function DevCard(props) {
  const { id } = useParams();
  const [candidate, setcandidate] = useState({});
  const [currentEmp, setcurrentEmp] = useState({});
  const [role, setRole] = useState({});
  const [HRs, setHRs] = useState([]);
  const [formComment, setComment] = useState("");
  const [formIsSelected, setIsSelected] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [formUser, setFormUser] = useState();
  const [NonHRs, setNonHRs] = useState([]);
  const [finalRoundHRs, setFinalRoundHRs] = useState([]);
  const [lastContacted, setLastContacted] = useState("");
  //const [star, setstar] = useState("");
  const [hover, setHover] = useState(null);
  //const [hrRating, setHrRating] = useState("");
  const [overallrating, setoverallRating] = useState("0");
  const [reliability, setReliability] = useState("0");
  const [skillSet, setSkillSet] = useState("0");
  const [assessment, setAssessment] = useState("0");
  const [empStatus, setempstatus] = useState(false);
  const [emptyComment, setemptyComment] = useState(false);
  const [empComment, setempComment] = useState(false);

  useEffect(() => {
    fetchHrRole();
    loadCandidate();
    fetchLoginUserData();
  }, []);

  const fetchLoginUserData = async () => {
    try {
      const loginUserData = await localStorage.getItem("authuser");
      if (loginUserData) {
        const jsonData = JSON.parse(loginUserData);
        setcurrentEmp(jsonData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let tempLastContacted = "";
    if (candidate.rejectedByEmpId) {
      setLastContacted(candidate.rejectedByEmpId);
    } else if (candidate.isOnHold && candidate.onHoldByEmpId) {
      setLastContacted(candidate.onHoldByEmpId);
    } else if (
      candidate.onBoardRoundIsSelected &&
      candidate.onBoardedRoundEmpId
    ) {
      setLastContacted(candidate.onBoardedRoundEmpId);
    } else if (
      candidate.offeredRoundIsSelected ||
      candidate.offeredRoundEmpId
    ) {
      setLastContacted(candidate.offeredRoundEmpId);
    } else if (candidate.finalRoundIsSelected || candidate.finalRoundEmpId) {
      setLastContacted(candidate.finalRoundEmpId);
    } else if (candidate.secondRoundIsSelected || candidate.secondRoundEmpId) {
      setLastContacted(candidate.secondRoundEmpId);
    } else if (candidate.firstRoundIsSelected || candidate.firstRoundEmpId) {
      setLastContacted(candidate.firstRoundEmpId);
    } else if (
      candidate.devScreeningIsSelected ||
      candidate.devScreeningEmpId
    ) {
      setLastContacted(candidate.devScreeningEmpId);
    }
  }, [candidate]);

  //rating by dev
  useEffect(async () => {
    const usertoken = localStorage.getItem("token");
    const jsonData = JSON.parse(localStorage.getItem("authuser"));
    if (candidate.secondRoundEmpId) {
      if (overallrating || reliability || skillSet || assessment) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          _id: jsonData.id,
          currentStatus: "secondRound",
          secondOverall: overallrating,
          secondReliability: reliability,
          secondSkillSet: skillSet,
          secondAssessment: assessment,
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/dev-rating",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
        }
      }
    } else if (candidate.firstRoundEmpId) {
      if (overallrating || reliability || skillSet || assessment) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          _id: jsonData.id,
          currentStatus: "firstRound",
          firstOverall: overallrating,
          firstReliability: reliability,
          firstSkillSet: skillSet,
          firstAssessment: assessment,
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/dev-rating",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
        }
      }
    } else if (candidate.devScreeningEmpId) {
      if (overallrating || reliability || skillSet || assessment) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          _id: jsonData.id,
          currentStatus: "devScreening",
          devOverall: overallrating,
          devReliability: reliability,
          devSkillSet: skillSet,
          devAssessment: assessment,
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/dev-rating",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
        }
      }
    } else {
      console.log("err");
    }
  }, [overallrating, reliability, skillSet, assessment]);

  const onBoardHRMessage = async () => {
    try {
      if (candidate && formComment && formIsSelected) {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "onBoard",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "HR message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const onBoardEmployeeSelection = async () => {
    try {
      if (candidate && formUser) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          empID: formUser,
          laststatus: "onBoard",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-status/",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const offeredRoundScreeningEmployeeMessage = async () => {
    try {
      if (candidate && formComment && formIsSelected) {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "offerRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "HR message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const offerRoundHRSelection = async () => {
    try {
      if (candidate && formUser) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          empID: formUser,
          laststatus: "offerRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-status/",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const finalRoundScreeningHRMessage = async () => {
    try {
      if (candidate && formComment && formIsSelected === "onHold") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          empID: candidate.finalRoundEmpId,
          isCompleted: formIsSelected,
          laststatus: "onHold",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (candidate && formComment && formIsSelected === "false") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empID: candidate.finalRoundEmpId,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "rejected",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (
        (candidate && formComment && formIsSelected === "true") ||
        formIsSelected === "false"
      ) {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "finalRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "HR message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const finalRoundEmployeeSelection = async () => {
    try {
      if (candidate && formUser) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          empID: formUser,
          laststatus: "finalRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-status/",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const secondRoundScreeningEmployeeMessage = async () => {
    try {
      if (candidate && formComment && formIsSelected === "onHold") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empID: candidate.secondRoundEmpId,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "onHold",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (candidate && formComment && formIsSelected === "false") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empID: candidate.secondRoundEmpId,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "rejected",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (
        (candidate && formComment && formIsSelected === "true") ||
        formIsSelected === "false"
      ) {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "secondRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const secondRoundEmployeeSelection = async () => {
    try {
      if (candidate && formUser) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          empID: formUser,
          laststatus: "secondRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-status/",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const firstRoundScreeningEmployeeMessage = async () => {
    try {
      if (candidate && formComment && formIsSelected === "onHold") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          empID: candidate.firstRoundEmpId,
          isCompleted: formIsSelected,
          laststatus: "onHold",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
        }
      } else if (candidate && formComment && formIsSelected === "false") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empID: candidate.firstRoundEmpId,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "rejected",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (
        (candidate && formComment && formIsSelected === "true") ||
        formIsSelected === "false"
      ) {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "firstRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const firstRoundEmployeeSelection = async () => {
    try {
      if (candidate && formUser) {
        const usertoken = localStorage.getItem("token");
        const statusData = {
          candidateID: candidate._id,
          empID: formUser,
          laststatus: "firstRound",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-status/",
          statusData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "status updated successfully"
        ) {
          console.log(
            "Status updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const devScreeningEmployeeMessage = async () => {
    try {
      //e.preventDefault();
      if (candidate && formComment && formIsSelected === "onHold") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          empID: candidate.devScreeningEmpId,
          isCompleted: formIsSelected,
          laststatus: "onHold",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (candidate && formComment && formIsSelected === "false") {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empID: candidate.devScreeningEmpId,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "rejected",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("authuser", JSON.stringify(apiData.data.user));
          //navigate("/");
        }
      } else if (
        (candidate && formComment && formIsSelected === "true") ||
        formIsSelected === "false"
      ) {
        const usertoken = localStorage.getItem("token");
        const formData = {
          candidateID: candidate._id,
          empMessage: formComment,
          isCompleted: formIsSelected,
          laststatus: "devScreening",
        };
        const apiData = await axios.put(
          "http://localhost:8000/candidate/candidate-updated-message/",
          formData,
          { headers: { "Content-Type": "application/json", token: usertoken } }
        );
        console.log(apiData);
        window.alert(apiData.data.msg);
        if (
          apiData.status === 200 &&
          apiData.data.message === "message updated successfully"
        ) {
          console.log(
            "Employee message updated successfully",
            apiData.data.token,
            apiData.data.user
          );
        }
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  const viewHandler = async () => {
    const usertoken = localStorage.getItem("token");
    const rr = await axios(`http://localhost:8000/candidate/resume/${id}`, {
      method: "GET",
      responseType: "blob",
      "Content-Type": "multipart/form-data",
      headers: { token: usertoken },
      //Force to receive data in a Blob Format
    });
    if (setcandidate) {
      if (rr) {
        //Create a Blob from the PDF Stream
        const file = new Blob([rr.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      } else {
        console.log("error");
      }
    }
  };

  const loadCandidate = async () => {
    console.log(id);
    const usertoken = localStorage.getItem("token");
    const result = await axios.get(
      `http://localhost:8000/candidate/one-candidate/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          token: usertoken,
        },
      }
    );
    setcandidate(result.data);
    console.log(result);
  };

  const fetchHrRole = async () => {
    const usertoken = localStorage.getItem("token");
    const res = await axios
      .get("http://localhost:8000/auth/all-users", {
        headers: { token: usertoken },
      })
      .then((res) => {
        const tempObj = {};
        res.data.users.forEach((v) => {
          tempObj[v._id] = v.name;
        });
        setRole(tempObj);
        const jsonData = JSON.parse(localStorage.getItem("authuser"));
        const ss = jsonData.position;
        setHRs(ss);
        const allNonHRs = res.data.users.filter((v) => v.position !== "HR");
        setNonHRs(allNonHRs);
        const allHRs = res.data.users.filter((v) => v.position === "HR");
        setFinalRoundHRs(allHRs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function Validate(e) {
    var e = document.getElementById("dropdownMenu1");
    var strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
    if (strUser === "choose here") {
      setempstatus(true);
    } else {
      setempstatus(false);
    }
  }

  return (
    <div>
      <h3 className="candiText">Candidate card</h3>
      <div className="shadow p-4  bg-white">
        <div className="container">
          <h5 className="canditextFont">
            <i class="bi bi-person-badge"></i>
            {candidate && candidate.name ? candidate.name : "-"}
          </h5>
          <hr></hr>
          <div className="row">
            <div className="canditextFont col-4">EMAIL</div>
            <div className="canditextFont col-4">CURRENT STATUS</div>
            <div className="canditextFont col-4">HR RATING</div>
            <div className="w-100"></div>
            <div className=" col-4">
              {candidate && candidate.email ? candidate.email : "-"}
            </div>
            <div className="col-4">
              {candidate.onHoldByEmpId
                ? "On-hold"
                : candidate.rejectedByEmpId
                ? "Rejected"
                : candidate.onBoardedRoundEmpId
                ? "On Boarded"
                : candidate.offeredRoundEmpId
                ? "Offered"
                : candidate.finalRoundEmpId
                ? "Final round interview"
                : candidate.secondRoundEmpId
                ? "2nd round interview"
                : candidate.firstRoundEmpId
                ? "1st round interview"
                : candidate.devScreeningEmpId
                ? "Dev screening round"
                : ""}
            </div>
            <div className="canditextFont col-4">
              <span>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i < candidate.HRRating;
                  return (
                    <FaStar
                      color={ratingValue ? "#ffc107" : "#e4e5e9"}
                      size={25}
                    />
                  );
                })}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="canditextFont mt-4 col-4">ASSIGNED TO</div>
            <div className="canditextFont mt-4 col-4">OVERALL RATING</div>
            <div className="w-100"></div>
            <div className=" col-4">
              <div className=" col-6">
                {role[candidate.hrID] ? role[candidate.hrID] : "-"}
              </div>
            </div>
            <div className=" col-4">
              {(candidate && candidate.devScreeningEmpId) ||
              candidate.firstRoundEmpId ||
              candidate.secondRoundEmpId ? (
                <div>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onChange={(e) => setoverallRating(e.target.value)}
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= overallrating ? "#ffc107" : "#e4e5e9"
                          }
                          size={25}
                          // onMouseEnter={() => setHover(ratingValue)}
                          // onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className=" col-4"></div>
          </div>
          <div className="row">
            <div className="canditextFont mt-4 col-4">RELIABILITY</div>
            <div className="canditextFont mt-4 col-4">SKILLSET</div>
            <div className="canditextFont mt-4 col-4">ASSESSMENT</div>
            <div className="w-100"></div>
            <div className=" col-4">
              {(candidate && candidate.devScreeningEmpId) ||
              candidate.firstRoundEmpId ||
              candidate.secondRoundEmpId ? (
                <div>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onChange={(e) => setReliability(e.target.value)}
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= reliability ? "#ffc107" : "#e4e5e9"
                          }
                          size={25}
                          // onMouseEnter={() => setHover(ratingValue)}
                          // onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className=" col-4">
              {(candidate && candidate.devScreeningEmpId) ||
              candidate.firstRoundEmpId ||
              candidate.secondRoundEmpId ? (
                <div>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onChange={(e) => setSkillSet(e.target.value)}
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= skillSet ? "#ffc107" : "#e4e5e9"
                          }
                          size={25}
                          // onMouseEnter={() => setHover(ratingValue)}
                          // onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className=" col-4">
              {(candidate && candidate.devScreeningEmpId) ||
              candidate.firstRoundEmpId ||
              candidate.secondRoundEmpId ? (
                <div>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onChange={(e) => setAssessment(e.target.value)}
                        />
                        <FaStar
                          className="star"
                          color={
                            ratingValue <= assessment ? "#ffc107" : "#e4e5e9"
                          }
                          size={25}
                          // onMouseEnter={() => setHover(ratingValue)}
                          // onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="canditextFont mt-4 col-4">LAST STATUS</div>
            <div className="w-100"></div>
            <div className=" col-4">
              <div class="input-group mb-3">
                {candidate.devScreeningIsSelected ||
                candidate.firstRoundIsSelected ||
                candidate.secondRoundIsSelected ||
                candidate.finalRoundIsSelected ||
                candidate.offeredRoundIsSelected ||
                candidate.onBoardRoundIsSelected
                  ? " selected"
                  : " not selected"}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="canditextFont col-4">RESUME</div>
          <div className=" col-4">
            {candidate && candidate.resume ? (
              <button
                className="btn btn-sm btn-info"
                onClick={(e) => viewHandler(e)}
              >
                <i class="bi bi-file-pdf-fill"></i>
                click here
              </button>
            ) : (
              "-"
            )}
          </div>
          <hr></hr>
          <div className="row">
            {candidate.devScreeningEmpId ? (
              <div className="col-12 canditextFont">
                <p style={{ color: "#2471A3 " }}>DEVELOPER SCREENING</p>
                {/* Employee NAME */}
                Employee :{" "}
                {role[candidate.devScreeningEmpId] ||
                role[candidate.rejectedByEmpId]
                  ? role[candidate.devScreeningEmpId] ||
                    role[candidate.rejectedByEmpId]
                  : "-"}
                {/* Rating diaplay */}
                <span style={{ marginLeft: "7em" }}>
                  Overall Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.devOverall;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <span style={{ marginLeft: "7em" }}>
                  Reliability Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.devReliability;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <br />
                {/* Employee Comment display */}
                Comment :{" "}
                {candidate.devScreeningMessage ||
                  candidate.rejectMessage ||
                  candidate.onHoldMessage ||
                  "-"}
                <br />
                Dev Screening Status :
                {candidate.devScreeningIsSelected ? " selected" : " -"}
                {/* Skillset rating assessemnt */}
                <span style={{ marginLeft: "8em" }}>
                  Skillset Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.devSkillSet;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <span style={{ marginLeft: "7em" }}>
                  Assessment Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.devAssessment;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                {candidate.devScreeningEmpId === currentEmp.id &&
                  candidate.rejectedByEmpId === null &&
                  candidate.onHoldByEmpId === null &&
                  candidate.devScreeningIsSelected === null && (
                    <div className="col-4 ">
                      <select
                        onChange={(e) => setIsSelected(e.target.value)}
                        id="dropdownMenu1"
                        onBlur={(e) => Validate(e)}
                      >
                        <option>choose here</option>
                        <option value="true">Selected</option>
                        <option value="false">rejected</option>
                        <option value="onHold">on hold</option>
                      </select>
                      {empStatus === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please select the status from the dropdown
                        </p>
                      ) : (
                        false
                      )}
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          if (e.target.value !== "") {
                            setemptyComment(false);
                            if (e.target.value.match(/[0-9,a-z,A-Z,+]+$/)) {
                              console.log("Done");
                              setemptyComment(false);
                            } else {
                              console.log("Invalid");
                              setemptyComment(true);
                            }
                          } else {
                            setemptyComment(true);
                          }
                        }}
                      ></textarea>
                      {emptyComment === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please provide the comments
                        </p>
                      ) : (
                        false
                      )}

                      {empComment === true ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please Enter Valid Expertise{" "}
                        </p>
                      ) : (
                        false
                      )}
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) => devScreeningEmployeeMessage(e)}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                {HRs === "HR" &&
                  candidate.devScreeningIsSelected !== null &&
                  candidate.firstRoundEmpId === null && (
                    <div style={{ color: "#2471A3" }}>
                      Please select an employee for first round interview:
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {NonHRs.length &&
                          NonHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm "
                        onClick={(e) => firstRoundEmployeeSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.firstRoundEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3 " }}> FIRST ROUND SCREENING </p>
                Employee :{" "}
                {role[candidate.firstRoundEmpId] ||
                role[candidate.rejectedByEmpId]
                  ? role[candidate.firstRoundEmpId] ||
                    role[candidate.rejectedByEmpId]
                  : "-"}
                {/* Overall rating */}
                <span style={{ marginLeft: "7em" }}>
                  Overall Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.firstOverall;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <span style={{ marginLeft: "7em" }}>
                  Reliability Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.firstReliability;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <br />
                Comment :
                {candidate.firstRoundMessage ||
                  candidate.rejectMessage ||
                  candidate.onHoldMessage ||
                  "-"}
                <br />
                First round status :
                {candidate.firstRoundIsSelected
                  ? " selected"
                  : " not selected yet"}
                {/* Rating display */}
                <span style={{ marginLeft: "7em" }}>
                  Skillset Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.firstSkillSet;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <span style={{ marginLeft: "7em" }}>
                  Assessment Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.firstAssessment;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                {candidate.firstRoundEmpId === currentEmp.id &&
                  candidate.rejectedByEmpId === null &&
                  candidate.onHoldByEmpId === null &&
                  candidate.firstRoundIsSelected === null && (
                    <div className="col-4 ">
                      <select
                        onChange={(e) => setIsSelected(e.target.value)}
                        id="dropdownMenu1"
                        onBlur={(e) => Validate(e)}
                      >
                        <option>choose here</option>
                        <option value="true">Selected</option>
                        <option value="false">rejected</option>
                        <option value="onHold">on hold</option>
                      </select>
                      {empStatus === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please select the status from the dropdown
                        </p>
                      ) : (
                        false
                      )}
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          if (e.target.value !== "") {
                            setemptyComment(false);
                            if (e.target.value.match(/[0-9,a-z,A-Z,+]+$/)) {
                              console.log("Done");
                              setemptyComment(false);
                            } else {
                              console.log("Invalid");
                              setemptyComment(true);
                            }
                          } else {
                            setemptyComment(true);
                          }
                        }}
                      ></textarea>
                      {emptyComment === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please provide the comments
                        </p>
                      ) : (
                        false
                      )}

                      {empComment === true ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please Enter Valid Expertise{" "}
                        </p>
                      ) : (
                        false
                      )}
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) => firstRoundScreeningEmployeeMessage(e)}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                {HRs === "HR" &&
                  candidate.firstRoundIsSelected !== null &&
                  candidate.secondRoundEmpId === null && (
                    <div style={{ color: "#2471A3 " }}>
                      Please select an employee for second round interview
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {NonHRs.length &&
                          NonHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => secondRoundEmployeeSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.secondRoundEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3" }}>SECOND ROUND SCREENING</p>
                {/* Employee name */}
                Employee :{" "}
                {role[candidate.secondRoundEmpId] ||
                role[candidate.rejectedByEmpId]
                  ? role[candidate.secondRoundEmpId] ||
                    role[candidate.rejectedByEmpId]
                  : "-"}
                {/* Rating */}
                <span style={{ marginLeft: "7em" }}>
                  Overall Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.secondOverall;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <span style={{ marginLeft: "7em" }}>
                  Reliability Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.secondReliability;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <br />
                Comment :{" "}
                {candidate.secondRoundMessage ||
                  candidate.rejectMessage ||
                  candidate.onHoldMessage ||
                  "-"}
                <br />
                Second Round status :{" "}
                {candidate.secondRoundIsSelected
                  ? " selected"
                  : " not selected"}
                {/* Rating */}
                <span style={{ marginLeft: "6em" }}>
                  Skillset Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.secondSkillSet;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                <span style={{ marginLeft: "6em" }}>
                  Assessment Rating :
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i < candidate.secondAssessment;
                    return (
                      <FaStar
                        color={ratingValue ? "#ffc107" : "#e4e5e9"}
                        size={15}
                      />
                    );
                  })}
                </span>
                {candidate.secondRoundEmpId === currentEmp.id &&
                  candidate.rejectedByEmpId === null &&
                  candidate.onHoldByEmpId === null &&
                  candidate.secondRoundIsSelected === null && (
                    <div className="col-4 ">
                      <select
                        onChange={(e) => setIsSelected(e.target.value)}
                        id="dropdownMenu1"
                        onBlur={(e) => Validate(e)}
                      >
                        <option>choose here</option>
                        <option value="true">Selected</option>
                        <option value="false">Rejected</option>
                        <option value="onHold">on Hold</option>
                      </select>
                      {empStatus === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please select the status from the dropdown
                        </p>
                      ) : (
                        false
                      )}
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          if (e.target.value !== "") {
                            setemptyComment(false);
                            if (e.target.value.match(/[0-9,a-z,A-Z,+]+$/)) {
                              console.log("Done");
                              setemptyComment(false);
                            } else {
                              console.log("Invalid");
                              setemptyComment(true);
                            }
                          } else {
                            setemptyComment(true);
                          }
                        }}
                      ></textarea>
                      {emptyComment === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please provide the comments
                        </p>
                      ) : (
                        false
                      )}

                      {empComment === true ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please Enter Valid Expertise{" "}
                        </p>
                      ) : (
                        false
                      )}
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) =>
                            secondRoundScreeningEmployeeMessage(e)
                          }
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                {HRs === "HR" &&
                  candidate.secondRoundIsSelected !== null &&
                  candidate.finalRoundEmpId === null && (
                    <div style={{ color: "#2471A3" }}>
                      Select the HR for final round interview
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {finalRoundHRs.length &&
                          finalRoundHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => finalRoundEmployeeSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.finalRoundEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3" }}>FINAL ROUND</p>
                Employee :
                {role[candidate.finalRoundEmpId] ||
                role[candidate.rejectedByEmpId]
                  ? role[candidate.finalRoundEmpId] ||
                    role[candidate.rejectedByEmpId]
                  : "-"}
                <br />
                Comment :{" "}
                {candidate.finalRoundMessage ||
                  candidate.rejectMessage ||
                  candidate.onHoldMessage ||
                  "-"}
                <br />
                Final Round status :
                {candidate.finalRoundIsSelected ? "selected" : "not selected"}
                {candidate.finalRoundEmpId === currentEmp.id &&
                  candidate.rejectedByEmpId === null &&
                  candidate.onHoldByEmpId === null &&
                  candidate.finalRoundIsSelected === null && (
                    <div className="col-4 ">
                      <select
                        onChange={(e) => setIsSelected(e.target.value)}
                        id="dropdownMenu1"
                        onBlur={(e) => Validate(e)}
                      >
                        <option>choose here</option>
                        <option value="true">Selected</option>
                        <option value="false">Rejected</option>
                        <option value="onHold">On hold</option>
                      </select>
                      {empStatus === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please select the status from the dropdown
                        </p>
                      ) : (
                        false
                      )}
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          if (e.target.value !== "") {
                            setemptyComment(false);
                            if (e.target.value.match(/[0-9,a-z,A-Z,+]+$/)) {
                              console.log("Done");
                              setemptyComment(false);
                            } else {
                              console.log("Invalid");
                              setemptyComment(true);
                            }
                          } else {
                            setemptyComment(true);
                          }
                        }}
                      ></textarea>
                      {emptyComment === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please provide the comments
                        </p>
                      ) : (
                        false
                      )}

                      {empComment === true ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please Enter Valid Expertise{" "}
                        </p>
                      ) : (
                        false
                      )}
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) => finalRoundScreeningHRMessage(e)}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                {HRs === "HR" &&
                  candidate.finalRoundIsSelected !== null &&
                  candidate.offeredRoundEmpId === null && (
                    <div style={{ color: "#2471A3" }}>
                      Select the HR for offer round
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {finalRoundHRs.length &&
                          finalRoundHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => offerRoundHRSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.offeredRoundEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3" }}>OFFERED ROUND</p>
                HR :{" "}
                {role[candidate.offeredRoundEmpId]
                  ? role[candidate.offeredRoundEmpId]
                  : "-"}{" "}
                <br />
                comment : {candidate.offeredRoundMessage || " - "}
                <br />
                Offered Round Status:
                {candidate.offeredRoundIsSelected ? "selected" : " - "}
                {candidate.offeredRoundEmpId === currentEmp.id &&
                  candidate.offeredRoundIsSelected === null && (
                    <div className="col-4 ">
                      <select
                        onChange={(e) => setIsSelected(e.target.value)}
                        id="dropdownMenu1"
                        onBlur={(e) => Validate(e)}
                      >
                        <option>choose here</option>
                        <option value="true">Selected</option>
                      </select>
                      {empStatus === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please select the status from the dropdown
                        </p>
                      ) : (
                        false
                      )}
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          if (e.target.value !== "") {
                            setemptyComment(false);
                            if (e.target.value.match(/[0-9,a-z,A-Z,+]+$/)) {
                              console.log("Done");
                              setemptyComment(false);
                            } else {
                              console.log("Invalid");
                              setemptyComment(true);
                            }
                          } else {
                            setemptyComment(true);
                          }
                        }}
                      ></textarea>
                      {emptyComment === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please provide the comments
                        </p>
                      ) : (
                        false
                      )}

                      {empComment === true ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please Enter Valid Expertise{" "}
                        </p>
                      ) : (
                        false
                      )}
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) =>
                            offeredRoundScreeningEmployeeMessage(e)
                          }
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                {HRs === "HR" &&
                  candidate.offeredRoundIsSelected !== null &&
                  candidate.onBoardedRoundEmpId === null && (
                    <div style={{ color: "#2471A3" }}>
                      Select the HR for On-boarding the candidate
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {finalRoundHRs.length &&
                          finalRoundHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => onBoardEmployeeSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.onBoardedRoundEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3" }}> OnBoard</p>
                HR :
                {role[candidate.onBoardedRoundEmpId]
                  ? role[candidate.onBoardedRoundEmpId]
                  : "-"}
                <br />
                comment : {candidate.onBoardedRoundMessage || "."}
                <br />
                Current Status:
                {candidate.onBoardRoundIsSelected ? "selected" : "-"}
                {candidate.onBoardedRoundEmpId === currentEmp.id &&
                  candidate.onBoardRoundIsSelected === null && (
                    <div className="col-4 ">
                      <select
                        onChange={(e) => setIsSelected(e.target.value)}
                        id="dropdownMenu1"
                        onBlur={(e) => Validate(e)}
                      >
                        <option>choose here</option>
                        <option value="true">Selected</option>
                      </select>
                      {empStatus === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please select the status from the dropdown
                        </p>
                      ) : (
                        false
                      )}
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                        onBlur={(e) => {
                          console.log(e.target.value);
                          if (e.target.value !== "") {
                            setemptyComment(false);
                            if (e.target.value.match(/[0-9,a-z,A-Z,+]+$/)) {
                              console.log("Done");
                              setemptyComment(false);
                            } else {
                              console.log("Invalid");
                              setemptyComment(true);
                            }
                          } else {
                            setemptyComment(true);
                          }
                        }}
                      ></textarea>
                      {emptyComment === true ? (
                        <p style={{ color: "#F1C40F" }}>
                          Please provide the comments
                        </p>
                      ) : (
                        false
                      )}

                      {empComment === true ? (
                        <p style={{ color: "red" }}>
                          {" "}
                          Please Enter Valid Expertise{" "}
                        </p>
                      ) : (
                        false
                      )}
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) => onBoardHRMessage(e)}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                {/* {HRs === "HR" &&
                  candidate.offeredRoundIsSelected !== null &&
                  candidate.onBoardedRoundEmpId === null && (
                    <div>
                      Select the HR for On-boarding the candidate
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {finalRoundHRs.length &&
                          finalRoundHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => onBoardEmployeeSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )} */}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.rejectedByEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3" }}>REJECTED STATUS</p>
                Employee :
                {role[candidate.rejectedByEmpId]
                  ? role[candidate.rejectedByEmpId]
                  : "-"}
                <br />
                Comment : {candidate.rejectMessage || "."}
                <br />
                Current Status :{" "}
                {candidate.isRejected === "false" ? "-" : "rejected"}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>

          <div className="row">
            {candidate.onHoldByEmpId ? (
              <div className="col-12 canditextFont">
                <hr></hr>
                <p style={{ color: "#2471A3" }}>ON-HOLD STATUS</p>
                Employee :
                {role[candidate.onHoldByEmpId]
                  ? role[candidate.onHoldByEmpId]
                  : "-"}
                {/* <br />
                Comment : {candidate.onHoldMessage || "-"} */}
                <br />
                Current Status :
                {candidate.isOnHold === "false" ? " onhold" : " -"}
                {/* {candidate.onHoldByEmpId === currentEmp.id 
                   && candidate.isOnHold === "false" && (
                    <div className="col-4 ">
                      <select onChange={(e) => setIsSelected(e.target.value)}>
                        <option>choose here</option>
                        <option value="true">Selected</option>
                        <option value="false">Rejected</option>
                        <option value="onHold">On hold</option>
                      </select>
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <br />
                      <div className="candibutton">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          onClick={(e) => onHoldMessage(e)}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  )} */}
                {HRs === "HR" &&
                  candidate.isOnHold === "false" &&
                  candidate.onHoldByEmpId !== null && (
                    <div style={{ color: "#2471A3" }}>
                      Select the employee for next round
                      <select
                        className="select form-select form-select"
                        style={{ width: "400px" }}
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onChange={(e) => setFormUser(e.target.value)}
                      >
                        <option value="">Select</option>
                        {finalRoundHRs.length &&
                          finalRoundHRs.map((v) => {
                            return <option value={v._id}>{v.name}</option>;
                          })}
                      </select>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={(e) => offerRoundHRSelection(e)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <span hidden="true"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevCard;
