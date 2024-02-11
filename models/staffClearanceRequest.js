import { Schema, model, models } from "mongoose";

const StaffRequestSchema = new Schema({
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
  firstname: {
    type: String,
    required: [true, "firstname is required!"],
  },
  middlename: {
    type: String,
    required: [true, "middlename is required!"],
  },
  privilege: {
    type: String,
    // required: [true, "privilege is required!"],
  },
  role: {
    type: String,
    required: [true, "role is required!"],
  },
});

const StaffClearnceReq =
  models.StaffClearnceReq || model("StaffClearnceReq", StaffRequestSchema);

export default StaffClearnceReq;
