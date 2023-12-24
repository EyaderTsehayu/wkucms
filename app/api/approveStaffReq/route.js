import { connectToDB } from "@/utils/database";
import StaffClearnceReq from "@/models/staffClearanceRequest";

const staffApproval = ["HR", "HEAD", "DORM"];

export const PATCH = async (request) => {
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();

    const existingRequest = await StaffClearnceReq.findById(objectId);

    if (existingRequest) {
      const currentIndex = staffApproval.indexOf(existingRequest.status);

      if (currentIndex !== -1 && currentIndex < staffApproval.length - 1) {
        existingRequest.status = staffApproval[currentIndex + 1];
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
