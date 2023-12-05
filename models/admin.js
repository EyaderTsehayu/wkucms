import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  adminId: {
    type: String,
    unique: [true, "ID already exists!"],
    required: [true, "Id is required!"],
  },
  firstName: {
    type: String,
    required: [true, "firstname is required"],
  },
  middleName: {
    type: String,
    required: [true, "middlename is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
  },
  password: {
    type: String,
  },
  officename: {
    type: String,
  },
  role: {
    type: String,
  },
});

const Admin = models.Admin || model("Admin", AdminSchema);
export default Admin;
