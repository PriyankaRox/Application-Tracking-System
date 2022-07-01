const router = require("express").Router();

const {
  createUserController,
  userListController,
  viewAllPosition,
  createLoginController,
  passwordResetController,
  emailSend,
  changepassword,
} = require("../controller/auth");
const { signupValidation } = require("../validation/authValidation");
const { JwtMiddleware } = require("../helper/jwtMiddleware");


router.post("/signup", JwtMiddleware, signupValidation, createUserController);

router.post("/adduser", signupValidation, createUserController);

//route to read all admin and employees
router.get("/all-users/", userListController);

//routes to get user position
router.get("/view-all-user/:position", viewAllPosition);

//router to password resest
router.post("/password-reset", passwordResetController)

router.post("/login", createLoginController);

//route to change password
router.post("/email-send", emailSend);

router.post("/change-password", changepassword);


module.exports = router;
