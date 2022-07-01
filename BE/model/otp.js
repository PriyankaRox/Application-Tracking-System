const mongoose = require("mongoose");

var OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },

    code: {
      type: String,
    },
    expireIn: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const otp = mongoose.model("OTP", OtpSchema);

module.exports = otp;
