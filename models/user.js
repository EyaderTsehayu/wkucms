import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: [true, "ID already exists!"],
    required: [true, "Id is required!"],
  },
  firstname: {
    type: String,
    required: [true, "firstname is required"],
  },
  middlename: {
    type: String,
    required: [true, "middlename is required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
  },

  password: {
    type: String,
  },

  collegeName: {
    type: String,
  },
  departmentName: {
    type: String,
  },
  officename: {
    type: String,
  },
  image: {
    type: String,
  },
  year: {
    type: String,
  },

  role: {
    type: String,
  },
  privilege:{
    type:String,
  },
  email:{
    type:String
  },
  profilePic:{
    type:String
  },
  blockNo:{
    type:String
  },
  status:{
    type:String
  },
  emailResetPassword:{
    type:String
  },
  emailToken:{
    type:String
  },
  resetToken : {
    type:String
  },
 passwordResetExpires :{
    type:Date
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
