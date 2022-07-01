const { Newjob } = require("../model/jobSchema");


//creating job
const createJobController = async (req, res) => {
  try {
    const {
      jobid,
      title,
      description,
      experience,
      techStack,
      qualification,
      noticePeriod,
      status,
      hrID,
    } = req.body;
    const newData = new Newjob({
      jobid,
      title,
      description,
      experience,
      techStack,
      qualification,
      noticePeriod,
      status,
      hrID: hrID ? hrID : res.locals.user.id,
    });
    const savedData = await newData.save();
    if (!savedData) {
      res.json({ message: "New Job Not Saved" });
    } else {
      const returnData = JSON.parse(JSON.stringify(savedData));
      returnData.id = returnData._id;
      delete returnData._id;
      delete returnData.__v;
      res.json({ message: "New Job added successfully", Newjob: returnData });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//reading all jobs
const allJobController = async (req, res) => {
  try {
    const jobExists = await Newjob.find({ status: "active" });
    if (!jobExists) {
      res.status(400).json({ error: "Active job does not exists" });
    } else {
      res.send(jobExists);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};


//view all jobs
const viewAllJobController = async (req, res) => {
  try {
    var status = req.params.status;
    const viewJobExists = await Newjob.find({ status: status });
    if (!viewJobExists) {
      res.status(400).json({ error: "Job does not exists" });
    } else {
      res.send(viewJobExists);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//reading partcular job
const particularJobById = async (req, res, next) => {
  var jobid = req.params.jobid;
  const jobDetails = await Newjob.findById(jobid);
  res.send(jobDetails);
};

//update job status
const updateJobStatusController = async (req, res) => {
  try {
    var jobid = req.body.jobid;
    var newStatus = req.body.newStatus;
    const acceptedValues = ["active", "inactive", "pause"];
    if (jobid && acceptedValues.includes(newStatus)) {
      const updatejob = await Newjob.updateOne(
        { _id: jobid },
        { $set: { status: newStatus } }
      );
      res.send({ msg: "update successful" });
    } else {
      res.status(400).send({ msg: "update failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};


module.exports = {
  createJobController,
  allJobController,
  viewAllJobController,
  particularJobById,
  updateJobStatusController,
};
