import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";

const studentApproval = ["HEAD", "COLLEGEDEAN", "DORMITARY"];

export const PATCH = async (request) => {
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();

    const existingRequest = await StudentClearnceReq.findById(objectId);

    if (existingRequest) {
      const currentIndex = studentApproval.indexOf(existingRequest.status);

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
