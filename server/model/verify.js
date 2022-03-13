const mongoose = require("mongoose");


const userOtpVerifySchema = mongoose.schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date,

})

const UserOTPVerification = mongoose.model("UserOTPVerification",userOtpVerifySchema)

module.exports =UserOTPVerification;