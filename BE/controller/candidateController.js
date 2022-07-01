const jwt = require("jsonwebtoken");
const { Newcandidate } = require("../model/candidateSchema");

//creating candidate
const createCandidateController = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      totalExperience,
      relavantExperience,
      jobid,
      currentCtc,
      expectedCtc,
      noticePeriod,
      expertise,
      resume,
      lastStatus,
      HRRating,
      hrID,
      hrScreeningMessage,
      devScreeningEmpId,
      devScreeningMessage,
      devScreeningIsSelected,
      firstRoundEmpId,
      firstRoundMessage,
      firstRoundIsSelected,
      secondRoundEmpId,
      secondRoundMessage,
      secondRoundIsSelected,
      finalRoundEmpId,
      finalRoundMessage,
      finalRoundIsSelected,
      offeredRoundMessage,
      onBoardedRoundMessage,
      rejectMessage,
      onHoldMessage,
    } = req.body;
    //console.log(req.body);
    const newData = new Newcandidate({
      name,
      email,
      phone,
      totalExperience,
      relavantExperience,
      jobid,
      currentCtc,
      expectedCtc,
      noticePeriod,
      expertise,
      resume,
      lastStatus,
      HRRating,
      hrID,
      hrScreeningMessage,
      devScreeningEmpId,
      devScreeningMessage,
      devScreeningIsSelected,
      firstRoundEmpId,
      firstRoundMessage,
      firstRoundIsSelected,
      secondRoundEmpId,
      secondRoundMessage,
      secondRoundIsSelected,
      finalRoundEmpId,
      finalRoundMessage,
      finalRoundIsSelected,
      offeredRoundMessage,
      onBoardedRoundMessage,
      rejectMessage,
      onHoldMessage,
    });
    const savedData = await newData.save();
    if (!savedData) {
      res.json({ message: "New Candidate Not Saved" });
    } else {
      const returnData = JSON.parse(JSON.stringify(savedData));
      returnData.id = returnData._id;
      delete returnData._id;
      delete returnData.__v;
      res.json({
        message: "New Candidate added successfully",
        Newcandidate: returnData,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//reading all candidates
const candidateListController = async (req, res) => {
  try {
    const jobID = req.query.jobid;
    let allCandidates = [];
    if (jobID) {
      allCandidates = await Newcandidate.find({ jobid: jobID });
    } else {
      allCandidates = await Newcandidate.find();
    }
    res.send({ candidates: allCandidates });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

const particularCandidateById = async (req, res) => {
  const candidate = req.params._id;
  const candidateDetails = await Newcandidate.findById(candidate);
  res.send(candidateDetails);
};

//resume
const fs = require("fs");
const candidateResume = async (req, res) => {
  const candidate = req.params._id;
  const candidateResume = await Newcandidate.findById(candidate);
  if (candidateResume) {
    let file = candidateResume.resume;
    fs.readFile(file, (err, files) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(files);
      }
    });
  } else {
    console.log("error");
  }
};

//update rating by HR
const updateRating = async (req, res) => {
  var candidateid = req.body._id;
  var rating = req.body.HRRating;
  if (candidateid && rating) {
    const updateRating = await Newcandidate.updateOne(
      { _id: candidateid },
      { $set: { HRRating: rating } }
    );
    res.send({ msg: "update successful" });
  } else {
    res.status(400).send({ msg: "update failed" });
  }
};

//update rating by developer
const developerRating = async (req, res) => {
  console.log(req);
  const candidateID = req.body.candidateID;
  const empID = res.locals.user.id;
  let status = req.body.currentStatus;
  let devOverall = req.body.devOverall;
  let devReliability = req.body.devReliability;
  let devSkillSet = req.body.devSkillSet;
  let devAssessment = req.body.devAssessment;
  let firstOverall = req.body.firstOverall;
  let firstReliability = req.body.firstReliability;
  let firstSkillSet = req.body.firstSkillSet;
  let firstAssessment = req.body.firstAssessment;
  let secondOverall = req.body.secondOverall;
  let secondReliability = req.body.secondReliability;
  let secondSkillSet = req.body.secondSkillSet;
  let secondAssessment = req.body.secondAssessment;
  const candidateDetails = await Newcandidate.findById(candidateID);
  console.log("dev", empID);
  console.log("candidate",candidateDetails);
  if (candidateID) {
    if (
      status === "devScreening" &&
      empID === candidateDetails.devScreeningEmpId
    ) {
      candidateDetails.devOverall = devOverall;
      candidateDetails.devReliability = devReliability;
      candidateDetails.devSkillSet = devSkillSet;
      candidateDetails.devAssessment = devAssessment;
      await candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (
      status === "firstRound" &&
      empID === candidateDetails.firstRoundEmpId
    ) {
      candidateDetails.firstOverall = firstOverall;
      candidateDetails.firstReliability = firstReliability;
      candidateDetails.firstSkillSet = firstSkillSet;
      candidateDetails.firstAssessment = firstAssessment;
      await candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (
      status === "secondRound" &&
      empID === candidateDetails.secondRoundEmpId
    ) {
      candidateDetails.secondOverall = secondOverall;
      candidateDetails.secondReliability = secondReliability;
      candidateDetails.secondSkillSet = secondSkillSet;
      candidateDetails.secondAssessment = secondAssessment;
      await candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else {
      res.status(400).send({ msg: "update failed" });
    }
  } else{
    res.status(400).send({ msg: "candidate not found" });
  }
};

//updating status of candidate by HR
const candidateUpdatedStatusController = async (req, res) => {
  if (res.locals.user.position !== "HR") {
    console.log(res.locals.user.position);
    res.status(400).send({ message: "You are not authorized" });
  } else {
    const empID = req.body.empID;
    const candidateID = req.body.candidateID;
    const newStatus = req.body.laststatus;
    const candidateDetails = await Newcandidate.findById(candidateID);
    if (newStatus === "devScreening") {
      candidateDetails.devScreeningEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (newStatus === "firstRound") {
      candidateDetails.firstRoundEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (newStatus === "secondRound") {
      candidateDetails.secondRoundEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (newStatus === "finalRound") {
      candidateDetails.finalRoundEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (newStatus === "offerRound") {
      candidateDetails.offeredRoundEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (newStatus === "onBoard") {
      candidateDetails.onBoardedRoundEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else if (newStatus === "rejected") {
      candidateDetails.rejectedByEmpId = empID;
      candidateDetails.save();
      res.send({ msg: "status updated successfully" });
    } else {
      res.status(400).send({ msg: "status update failed" });
    }
  }
};

//updating message of candidate by all Devs
const employeeUpdateMessageController = async (req, res) => {
  const empID = res.locals.user.id;
  const candidateID = req.body.candidateID;
  const currentStatus = req.body.laststatus;
  const empMsg = req.body.empMessage;
  const isCompleted = req.body.isCompleted === "true" ? true : false;
  const candidateDetails = await Newcandidate.findById(candidateID);
  if (candidateDetails) {
    if (currentStatus === "rejected") {
      candidateDetails.rejectedByEmpId = empID;
      candidateDetails.rejectMessage = empMsg;
      candidateDetails.devScreeningMessage = empMsg;
      candidateDetails.isRejected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: " updated successfully" });
    } else if (currentStatus === "onHold") {
      candidateDetails.onHoldByEmpId = empID;
      candidateDetails.onHoldMessage = empMsg;
      candidateDetails.devScreeningMessage = empMsg;
      candidateDetails.isOnHold = isCompleted;
      await candidateDetails.save();
      res.send({ msg: " updated successfully" });
    } else if (
      currentStatus === "devScreening" &&
      candidateDetails.devScreeningEmpId === empID
    ) {
      candidateDetails.devScreeningMessage = empMsg;
      candidateDetails.devScreeningIsSelected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: "message updated successfully" });
    } else if (
      currentStatus === "firstRound" &&
      candidateDetails.firstRoundEmpId === empID
    ) {
      candidateDetails.firstRoundMessage = empMsg;
      candidateDetails.firstRoundIsSelected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: "message updated successfully" });
    } else if (
      currentStatus === "secondRound" &&
      candidateDetails.secondRoundEmpId === empID
    ) {
      candidateDetails.secondRoundMessage = empMsg;
      candidateDetails.secondRoundIsSelected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: "message updated successfully" });
    } else if (
      currentStatus === "finalRound" &&
      candidateDetails.finalRoundEmpId === empID
    ) {
      candidateDetails.finalRoundMessage = empMsg;
      candidateDetails.finalRoundIsSelected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: "message updated successfully" });
    } else if (
      currentStatus === "offerRound" &&
      candidateDetails.offeredRoundEmpId === empID
    ) {
      candidateDetails.offeredRoundMessage = empMsg;
      candidateDetails.offeredRoundIsSelected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: "message updated successfully" });
    } else if (
      currentStatus === "onBoard" &&
      candidateDetails.onBoardedRoundEmpId === empID
    ) {
      candidateDetails.onBoardedRoundMessage = empMsg;
      candidateDetails.onBoardRoundIsSelected = isCompleted;
      await candidateDetails.save();
      res.send({ msg: "message updated successfully" });
    } else {
      res.status(400).send({ msg: "update failed" });
    }
  } else {
    res.status(400).send({ msg: "candidate not found" });
  }
};

module.exports = {
  particularCandidateById,
  createCandidateController,
  candidateListController,
  candidateUpdatedStatusController,
  employeeUpdateMessageController,
  updateRating,
  candidateResume,
  developerRating,
};
