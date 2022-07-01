const Joi = require("joi");

const candidateValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .max(50),
      
    email: Joi.string().required() .max(50).email(),
    phone: Joi.number().required(),
    totalExperience:Joi.string(),
    relavantExperience: Joi.string().max(100),
    jobid:Joi.string().max(100),
    currentCtc: Joi.number(),
    expectedCtc:Joi.number(),
    noticePeriod:Joi.string().max(100),
    expertise:Joi.string(),
    resume:Joi.string().required(),
    // lastStatus:Joi.string(),
    HRRating:Joi.string(),
    hrID:Joi.string(),
    hrScreeningMessage:Joi.string(),
    hrRoundDate:Joi.date(),
    devScreeningEmpId:Joi.string(),
    devScreeningMessage:Joi.string(),
    devRoundDate:Joi.date(),
    devScreeningIsSelected:Joi.boolean(),

    firstRoundEmpId:Joi.string(),
    firstRoundMessage:Joi.string(),
    firstRoundDate:Joi.date(),
    firstRoundIsSelected:Joi.boolean(),

    secondRoundEmpId:Joi.string(),
    secondRoundMessage:Joi.string(),
    secondRoundDate:Joi.string(),
    secondRoundIsSelected:Joi.boolean(),


    finalRoundEmpId:Joi.string(),
    finalRoundMessage:Joi.string(),
    finalRoundDate:Joi.date(),
    finalRoundIsSelected:Joi.boolean(),

    offeredRoundEmpId:Joi.string(),
    offeredRoundMessage:Joi.string(),
    offeredRoundDate:Joi.date(),

    onBoardedRoundEmpId:Joi.string(),
    onBoardedRoundMessage:Joi.string(),
    onBoardedDate:Joi.date(),

    rejectedByEmpId:Joi.string(),
    rejectMessage:Joi.string(),
    rejectedDate:Joi.date(),
    
    onHoldByEmpId:Joi.string(),
    onHoldMessage:Joi.string(),
    onHoldDate:Joi.date(),
  });
  const { value, error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res.json({ message: "invalid" });
  } else {
    next();
  }
};


module.exports = { candidateValidation };