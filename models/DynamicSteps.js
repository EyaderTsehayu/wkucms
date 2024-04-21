// models/Steps.js

// import { Schema, model, models } from "mongoose";

// // Define the schema for the steps data
// const StepsSchema = new Schema({
//   // Define a single field to store key-value pairs
 
//   steps: [
//     {
//       key: String,
//       value: Array,
//       required: true,
//     }
//   ],
// });

// // Create the model using the schema

// const DynamicSteps =models.Steps || model("DynamicSteps", StepsSchema);

// export default DynamicSteps;


import { Schema, model, models } from "mongoose";

const StepsSchema = new Schema({
  // steps: [
  //   {
  //     key: String,
  //     value: [String],
  //     // required: true, // This is the simplest way
  //   },
  // ],

  name: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate step names
    },
    nextSteps: {
        type: [String],
        default: []
    },
    stepType:{
      type: String,
      required: true,
     
  },
});

const DynamicSteps =models.DynamicSteps || model("DynamicSteps", StepsSchema);

export default DynamicSteps;
