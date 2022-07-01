const router = require("express").Router();

const {
    createCandidateController,
    candidateListController,
    particularCandidateById,
    candidateUpdatedStatusController,
    employeeUpdateMessageController,
    updateRating,
    candidateResume,
    developerRating,
} = require("../controller/candidateController");
const { JwtMiddleware } = require("../helper/jwtMiddleware");
const { fileupload } = require("../helper/fileUpload");
const { candidateValidation } = require("../validation/candidateValidation");



router.post(             //CRUD--create candidate
    "/add-candidate",
    JwtMiddleware,
    fileupload("resume"),
    candidateValidation,
    createCandidateController
  );

  router.get("/candidate-list",JwtMiddleware, candidateListController) //CRUD---read candidate

  router.get("/one-candidate/:_id",JwtMiddleware, particularCandidateById) 
  
  //resume
  router.get("/resume/:_id",JwtMiddleware, candidateResume)
  //candidate update status
  router.put("/candidate-updated-status/", JwtMiddleware,candidateUpdatedStatusController)
  
  //candidate update message
  router.put("/candidate-updated-message/",JwtMiddleware, employeeUpdateMessageController);
  
  //candidate rating update by HR
  router.put("/candidate-rating",JwtMiddleware, updateRating);

  //candidate rating update by developer
  router.put("/dev-rating/",JwtMiddleware, developerRating);


module.exports = router;
  