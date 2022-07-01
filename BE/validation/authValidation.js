const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .max(50)
      .regex(/^[a-zA-Z0-9. ]*$/, "Alphanumerics, space and dot characters"),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(12).required(),
    position: Joi.string().required(),
    userType: Joi.string().required(),
  });
  const { value, error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send({ err: "invalid" });
  } else {
    next();
  }
};


module.exports = { signupValidation };