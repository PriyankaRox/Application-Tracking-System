const Joi = require("joi");

const jobValidation = (req, res, next) => {
  const schema = Joi.object({
    jobid: Joi.string().required().max(50),
    title: Joi.string().required().max(50),
    description: Joi.string().required(),
    experience: Joi.string(),
    techStack: Joi.string().required().max(100),
    qualification: Joi.string().max(100),
    noticePeriod: Joi.string().max(100),
    status: Joi.string(),
    hrID:Joi.string(),
  });
  const { value, error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send({ err: "invalid" });
  } else {
    next();
  }
};

module.exports = { jobValidation };
