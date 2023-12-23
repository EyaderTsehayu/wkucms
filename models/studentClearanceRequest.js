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
  status: {
    type: String,
    required: [true, "Status is required!"],
  },

  firstname:{
    type: String,
    required: [true, "Status is required!"],
  },
  middlename:{
    type: String,
    required: [true, "Status is required!"],
  }

});

const StudentClearnceReq =
  models.StudentClearnceReq ||
  model("StudentClearnceReq", StudentRequestSchema);

export default StudentClearnceReq;
