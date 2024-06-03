import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type : String,
    required: [true, "Please provide username."],
  },
  email: {
    type : String,
    required: [true, "Please provide email."],
    unique: true
  },
  mobile: {
    type : String,
    unique: true
  },
  address: {
    type : String,
    unique: true
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [false, "Please provide gender."],
  },
  pic: {
    type: Buffer,
    // default: "default-pic-url"
  },
  password: {
    type : String,
    required: [true, "Please provide password."]
  },
  isVerified: {
    type : Boolean,
    default : false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;