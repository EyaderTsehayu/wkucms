import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import { STUDENTSTEPS } from "@/utils/constants";
import StepSchema from "@/models/step";
// const studentApproval = STUDENTSTEPS;
var studentApproval;
export const PATCH = async (request) => {
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();
    // first fetch the steps

    const steps = await StepSchema.findOne({ stepType: "STUDENT" });

    studentApproval = steps.steps;
    console.log("studentApprovalithink it works", studentApproval)
    console.log("ererererr",objectId,"aaaa",arrLength)

    const existingRequest = await StudentClearnceReq.findById(objectId);



    // if (existingRequest) {

    //   const capitalize = (str) => {
    //     return str.replace(/\b\w/g, (match) => match.toUpperCase());
    //   };



    //   const currentIndex = studentApproval.indexOf(capitalize(existingRequest.status?.trim().toLowerCase()));
    //   //  console.log("currentIndex" ,capitalize(existingRequest.status?.trim().toLowerCase()));
    //   if (currentIndex !== -1 && currentIndex < studentApproval.length - 1) {
    //     existingRequest.status = studentApproval[currentIndex + 1];
    //   } else {
    //     existingRequest.status = "APPROVED";
    //   }

    //   await existingRequest.save();

    //   return new Response(`Approved successfully ${arrLength} requests`, {
    //     status: 201,
    //   });
    // } else {
    //   return new Response("Request not found", { status: 404 });
    // }

    if (existingRequest) {
      const currentIndex = studentApproval.indexOf(existingRequest.status);
        console.log("currentIndex",currentIndex)
      if (currentIndex !== -1 && currentIndex < studentApproval.length - 1) {
        existingRequest.status = studentApproval[currentIndex + 1];
      } else {
        existingRequest.status = "APPROVED";
      }

      await existingRequest.save();

      return new Response(`Approved successfully ${arrLength} requests`, {
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
