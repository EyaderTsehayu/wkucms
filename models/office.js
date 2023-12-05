import { Schema, model, models } from "mongoose";

const OfficeSchema = new Schema({
 officeId: {
    type: String,
    unique: [true, "ID already exists!"],
    required: [true, "Id is required!"],
  },
  officeName: {
    type: String,
    required: [true, "officeName is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  items: {
    type: String,
    required: [true, "items is required"],
  },
  
});

const Office = models.Office || model("Offices", OfficeSchema);
export default Office;
