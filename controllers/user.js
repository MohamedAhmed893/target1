import otpUtils from "../utils/otp.js";
import userUtils from "../utils/user.js";
import Otp from "../Models/otp.js";
import User from "../Models/User.js";
import error from "../utils/generateErrorMessage.js";
async function resetPassword({ otp, email, password, confirmedPassword }) {
  try {
    const user = await isExist({ email });
    if (user) {
      const otpRecord = await isOtpExist(user[0]._id, otp);
      if (otpRecord) {
        if (password == confirmedPassword) {
          const result = await saveNewPassword(user[0].email, password);
          if (result) {
            await Otp.deleteOne({ _id: otpRecord._id });
            return error.generateErrorMessage(
              200,
              "Password reset successfully"
            );
          }
          return error.generateErrorMessage(400, "Error resetting password");
        }
        return error.generateErrorMessage(
          400,
          "Password and Confirm Password do not match"
        );
      }
      return error.generateErrorMessage(400, "Invalid OTP");
    }
    return error.generateErrorMessage(404, "User not found");
  } catch (err) {
    console.error(err);
    return error.generateErrorMessage(500, "Error");
  }
}

async function isOtpExist(id, otp) {
  const otpRecord = await Otp.find({ userId: id, otp });
  if (otpRecord) {
    return otpRecord;
  }
  return false;
}

async function saveNewPassword(email, password) {
  const newPassword = userUtils.ecncryptPassword(password);
  const result = await User.updateOne({ 'email': email }, { $set: { 'password': newPassword } })

  if (!result) {
    return error.generateErrorMessage(500, "Internal server Error");
  }
  userUtils.generateToken(result);
  return { value: result };
}
async function frogetPassword({ email }) {
  try {
    const user = await isExist({ email });
    if (user) {
      const generatedOtp = await otpUtils.generateOtp(user);
      if (generatedOtp) {
        return error.generateErrorMessage(200, "OTP generated succesfully");
      }
      return error.generateErrorMessage(500, "Internl server error");
    }
    return error.generateErrorMessage(404, "User not found");
  } catch (err) {
    console.error(err);
    return error.generateErrorMessage(500, "Error");
  }
}
async function signUp({ fullName, email, password, confirmedPassword, role }) {
  try {
    if (!fullName || !email || !password || !confirmedPassword) {
      return error.generateErrorMessage(400, "Missing Data");
    }
    if (role !== "CLIENT" && role !== "SELLER") {
      return error.generateErrorMessage(403, "Invalid Role");
    }
    if (!userUtils.validEmail(email)) {
      return error.generateErrorMessage(403, "InValid Email Format");
    }
    if (!userUtils.validPassword(password)) {
      return error.generateErrorMessage(
        403,
        " password must be at least eight characters, at least one letter, one number and one special character"
      );
    }
    if (!(await isExist({ email }))) {
      if (password == confirmedPassword) {
        password = userUtils.ecncryptPassword(password);
        const user = await User.create({ fullName, email, password, role });
        if (!user) {
          return error.generateErrorMessage(500, "An error has ocured");
        }
        userUtils.generateToken(user);
        return { value: user };
      }
      return error.generateErrorMessage(
        400,
        "Password and Confirm Password do not match"
      );
    }
    return error.generateErrorMessage(403, "user already exists");
  } catch (err) {
    console.error(err);
    return error.generateErrorMessage(500, "Error during signup");
  }
}
async function signin({ email, password }) {
  try {
    if (!email || !password) {
      return error.generateErrorMessage(400, "Missing Data");
    }
    let user = await isExist({ email });
    if (user[0]) {
      if (await userUtils.comparePassword(password, user[0].password)) {
        userUtils.generateToken(user[0]);
        return { value: user[0] };
      }
      return error.generateErrorMessage(401, "Invalid password");
    }
    return error.generateErrorMessage(401, "Invalid email or password");
  } catch (err) {
    console.error(err);
    return error.generateErrorMessage(500, "Error during login");
  }
}

async function isExist(email) {
  const user = await User.find(email);
  if (user.length) {
    return user;
  }
  return false;
}

export default {
  signUp,
  signin,
  frogetPassword,
  resetPassword,
};

