import { Schema, model, models } from "mongoose";

const StudentRequestSchema = new Schema({
  userId: {
    type: String,
    required: [true, "Id is required!"],
  },
  reason: {
    type: String,
    required: [true, "Reason is required!"],
  },
  attachedFile: { type: String },
  status: {
    type: String,
    required: [true, "Status is required!"],
  },

  firstname: {
    type: String,
    required: [true, "firstname is required!"],
  },
  middlename: {
    type: String,
    required: [true, "middlename is required!"],
  },
  role: {
    type: String,
    required: [true, "role is required!"],
  },
  collegeName:{
    type: String,
    // required: [true, "collegeId is required!"],
  },
  departmentName:{
    type: String,
    // required: [true, "departmentId is required!"],
  },
  _userId:{
    type:String,
  },
  blockNo:{
    type:String,
  },
  dateRequested:{
    type:String,
    required: [true, "Requested date is required!"],
  },
});

const StudentClearnceReq =
  models.StudentClearnceReq ||
  model("StudentClearnceReq", StudentRequestSchema);

export default StudentClearnceReq;
