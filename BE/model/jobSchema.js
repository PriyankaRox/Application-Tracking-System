const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    jobid: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    noticePeriod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    hrID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Newjob = mongoose.model("NEWJOB", jobSchema);

module.exports = { Newjob };
