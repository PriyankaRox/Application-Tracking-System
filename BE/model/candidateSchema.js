const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    totalExperience: {
      type: String,
      required: true,
    },
    relavantExperience: {
      type: String,
    },
    jobid: {
      type: String,
    },
    currentCtc: {
      type: Number,
    },
    expectedCtc: {
      type: Number,
    },
    noticePeriod: {
      type: String,
    },
    expertise:{
      type:String,
    },
    resume: {
      type: String,
    },
    // laststatus:{
    //   type:String,
    //   default:"Applied",
    // },
    HRRating:{
      type:String,
      default:"",
    },

    hrID:{
      type:String,
    },
    hrScreeningMessage:{
      type:String,
      default:null,
    },
    hrRoundDate:{
      type:Date,
      default: Date.now(),
    },

    devScreeningEmpId:{
      type:String,
      default: null,
    },
    devScreeningMessage:{
      type:String,
      default: null,
    },
    devRoundDate:{
      type:Date,
      default: Date.now(),
    },
    devScreeningIsSelected:{
      type:Boolean,
      default:null,
    },
    devOverall:{
      type:String,
      default:"0",
    },
    devReliability:{
      type:String,
      default:"0",
    },
    devSkillSet:{
      type:String,
      default:"0",
    },
    devAssessment:{
      type:String,
      default:"0",
    },


    firstRoundEmpId:{
      type:String,
      default: null,
    },
    firstRoundMessage:{
      type:String,
      default: null,
    },
    firstRoundDate:{
      type:Date,
      default: Date.now(),
    },
    firstRoundIsSelected:{
      type:Boolean,
      default:null,
    },
    firstOverall:{
      type:String,
      default:"",
    },
    firstReliability:{
      type:String,
      default:"",
    },
    firstSkillSet:{
      type:String,
      default:"",
    },
    firstAssessment:{
      type:String,
      default:"",
    },


    secondRoundEmpId:{
      type:String,
      default: null,
    },
    secondRoundMessage:{
      type:String,
      default: null,
    },
    secondRoundDate:{
      type:Date,
      default:Date.now(),
    },
    secondRoundIsSelected:{
      type:Boolean,
      default:null,
    },
    secondOverall:{
      type:String,
      default:"",
    },
    secondReliability:{
      type:String,
      default:"",
    },
    secondSkillSet:{
      type:String,
      default:"",
    },
    secondAssessment:{
      type:String,
      default:"",
    },


    finalRoundEmpId:{
      type:String,
      default:null,
    },
    finalRoundMessage:{
      type:String,
      default: null,
    },
    finalRoundDate:{
      type:Date,
      default: Date.now(),
    },
    finalRoundIsSelected:{
      type:Boolean,
      default:null,
    },


    offeredRoundEmpId:{
      type:String,
      default:null,
    },
    offeredRoundMessage:{
      type:String,
      default: null,
    },
    offeredRoundDate:{
      type:Date,
      default: Date.now(),
    },
    offeredRoundIsSelected:{
      type:Boolean,
      default:null,
    },


    onBoardedRoundEmpId:{
      type:String,
      default:null,
    },
    onBoardedRoundMessage:{
      type:String,
      default: null,
    },
    onBoardedDate:{
      type:Date,
      default: Date.now(),
    },
    onBoardRoundIsSelected:{
      type:Boolean,
      default:null,
    },
    

    rejectedByEmpId:{
      type:String,
      default:null,
    },
    rejectMessage:{
      type:String,
      default: null,
    },
    rejectedDate:{
      type:Date,
      default: Date.now(),
    },
    isRejected:{
      type:Boolean,
      default:null,
    },


    onHoldByEmpId:{
      type:String,
      default:null,
    },
    onHoldMessage:{
      type:String,
      default: null,
    },
    onHoldDate:{
      type:Date,
      default: Date.now(),
    },
    isOnHold:{
      type:String,
      default:null,
    },
    
  },
  {
    timestamps: true,
  }
);

const Newcandidate = mongoose.model("NEWCANDIDATE", candidateSchema);

module.exports = { Newcandidate };
