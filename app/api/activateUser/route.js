import { connectToDB } from "@/utils/database";

import User from "@/models/user";
import { toast } from "react-toastify";
// const studentApproval = STUDENTSTEPS;
var studentApproval;
export const PATCH = async (request) => {
  let message="";
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();
    // first fetch the steps

    // const steps = await StepSchema.findOne({ stepType: "STUDENT" });

    // studentApproval = steps.steps;
    // console.log("studentApprovalithink it works", studentApproval)
    // console.log("ererererr",objectId,"aaaa",arrLength)

    const existingRequest = await User.findById(objectId);



  
    if (existingRequest) {
      
    //   const currentIndex = studentApproval.indexOf(existingRequest.status);
    //     console.log("currentIndex",currentIndex)
      if (existingRequest.status == "active" ) {
        existingRequest.status = "inactive";
      message= "Request has been deactivated successfully";
      } else {
        existingRequest.status = "active";
        message="Request has been activated successfully";
      }

      await existingRequest.save();

      return new Response(`${message}`, {
        status: 201,
      });
    } else {
      return new Response("Request not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to update the request status", { status: 500 });
  }
};
