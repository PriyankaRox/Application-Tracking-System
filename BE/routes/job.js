const router = require("express").Router();

const {
  createJobController,
  allJobController,
  viewAllJobController,
  particularJobById,
  updateJobStatusController,
} = require("../controller/jobController");

const { JwtMiddleware } = require("../helper/jwtMiddleware");
const { jobValidation } = require("../validation/jobValidation");

//route to create new job
router.post("/add-newjob",JwtMiddleware, jobValidation, createJobController); //CRUD ---creating new entity

//route to get active new job in card
router.get("/all-jobs",JwtMiddleware, allJobController); //getting array of jobs CRUD--read multiple entity

//display all jobs route
router.get("/view-all-jobs/:status",JwtMiddleware, viewAllJobController);

//route to get job by id
router.get('/all-jobs/:jobid',JwtMiddleware,particularJobById); //particularjobs CRUD--read single entity

//update job status
router.put('/update-job-status', JwtMiddleware,updateJobStatusController); //CRUD---update job status


module.exports = router;
