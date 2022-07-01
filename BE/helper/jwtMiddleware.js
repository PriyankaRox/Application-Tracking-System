const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const JwtMiddleware = async (req, res, next) => {
  try {
    const jwttoken = req.headers.token;
    // console.log(jwttoken);
    if (jwttoken) {
      const jwtdata = await jwt.verify(jwttoken, secret_key);
      res.locals.user = jwtdata;
      next();
    } else {
      res.status(400).send({ message: "auth failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "auth failed" });
  }
};
module.exports = { JwtMiddleware };