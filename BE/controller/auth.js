const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const secret_key = process.env.SECRET_KEY;
const saltRounds = 15;
const { User, createUser } = require("../model/userSchema");
const Otp = require("../model/otp");

//creating users
const createUserController = async (req, res) => {
  try {
    const { name, email, password, position, userType } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.json({ message: "User already exists with this Emailid" });
    } else {
      const encrypted_password = await bcrypt.hash(password, saltRounds);
      const newData = new User({
        name,
        email,
        password: encrypted_password,
        position,
        userType,
      });
      const savedData = await newData.save();
      if (!savedData) {
        res.status(400).json({ error: "user not saved" });
      } else {
        const returnData = JSON.parse(JSON.stringify(savedData));
        returnData.id = returnData._id;
        delete returnData._id;
        delete returnData.__v;
        delete returnData.password;
        res.json({
          message: "New Employee added successfuly",
          user: returnData,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//reading users
const userListController = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send({ users: allUsers });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//reading users position
const viewAllPosition = async (req, res) => {
  try {
    var position = req.params.position;
    const viewPosition = await User.find({ position: position });
    if (!viewPosition) {
      res.status(400).json({ error: "position does not exists" });
    } else {
      res.send(viewPosition);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//login part
const createLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      res.status(400).json({ error: "User does not exists" });
    } else {
      const dbUserData = JSON.parse(JSON.stringify(userExists));
      passwordStatus = await bcrypt.compare(password, dbUserData.password);
      if (passwordStatus) {
        dbUserData.id = dbUserData._id;
        delete dbUserData._id;
        delete dbUserData.__v;
        delete dbUserData.password;
        const token = jwt.sign(dbUserData, secret_key);
        res.json({
          message: "User login successful",
          token: token,
          user: dbUserData,
        });
      } else {
        res.json({ message: "Invalid email or passsword" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "server error" });
  }
};

//password reset after login
const passwordResetController = async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const oldpassword = req.body.oldpassword;
    const loginid = req.body.loginid;
    const userExists = await User.findById(loginid);
    if (userExists) {
      const passwordStatus = await bcrypt.compare(
        oldpassword,
        userExists.password
      );
      if (passwordStatus) {
        userExists.password = await bcrypt.hash(newPassword, saltRounds);
        console.log(userExists.password);
        //  const newUSer = new User({id: userid, password: password})
        const savedData = await User.updateOne(
          { _id: userExists },
          { $set: { password: userExists.password } }
        );
        if (!savedData) {
          res.json({ message: "Password not Change" });
        } else {
          res.json({ message: "Password updated success" });
        }
      } else {
        return res.json({ message: "Old password is incorrect" });
      }
    } else {
      return res.json({ error: "User does not exits" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "server error" });
  }
};

const emailSend = async (req, res) => {
  let data = await User.findOne({ email: req.body.email });
  const responseType = {};
  if (data) {
    await Otp.deleteOne({ data });
    let otpcode = Math.floor((Math.random() * 100000) + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000
    })
    let otpResponse = otpData.save();
    responseType.statusText = 'Success'
    responseType.message = 'Please Check Your Email'
    mailer(otpData.email, otpData.code);
  } else {
    responseType.statusText = 'error'
    responseType.message = 'Email id Not Exit'
  }
  res.status(200).json(responseType);

};

const changepassword = async (req, res) => {
  let dat = await Otp.findOne({ email: req.body.email })
  const response = {}
  console.log(dat)
  console.log(req.body.email)
  // console.log(dat.email)
  // console.log(dat.expireIn)
  // console.log(dat.code==req.body.otpcode)
  // console.log(req.body.otpcode)




  if (dat.code == req.body.otpcode) {
    let currentTime = new Date().getTime();
    let diff = dat.expireIn - currentTime;
    if (diff < 0) {
      response.message = 'Token Expire'
      response.statusText = 'error'

    } else {
      let data = await User.findOne({ email: req.body.email })
      data.password = await bcrypt.hash(req.body.password, saltRounds);
      // console.log(data.password)
      // console.log(req.body.otpcode)
      // console.log(dat.code)
      // console.log(req.body.password); 


      const saveddata = await User.updateOne({ _id: data }, { $set: { password: data.password } });



      response.message = 'password change successfully'
      response.statusText = 'Suceess';

    }
  } else {
    response.message = "Invalide Otp"
    response.statusText = 'error'
  }






  res.status(200).json(response);

};

const mailer = (email, otp) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "mrudulajagdish@gmail.com",
      pass: "dvbinbbqawjlijwl",
    },
  });
  var mailOptions = {
    from: "mrudulajagdish@gmail.com",
    to: email,
    subject: "Change password OTP",
    text: "Your opt to change password " + otp,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent" + info.response);
    }
  });
};

module.exports = {
  createUserController,
  userListController,
  viewAllPosition,
  passwordResetController,
  createLoginController,
  emailSend,
  changepassword,
};
