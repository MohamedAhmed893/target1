import otpGenerator from "otp-generator"
import Otp from '../Models/otp.js'

async function generateOtp(user){
 const otpValue =otpGenerator.generate(4, { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false })
 console.log("na fe el otp utils",otpValue)
 const otp=new Otp({
    userId: user[0]._id,
    otp: otpValue,
 })
  await otp.save();
  return otp
}
export default {
    generateOtp
}