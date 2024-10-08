import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const PATCH = async (request) => {
  const session = await getServerSession(authOptions);
  const previlage = session?.user?.privilege;
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();

    const existingRequest = await StudentClearnceReq.findById(objectId);

    if (existingRequest) {
      if (!existingRequest.rejections) {
        existingRequest.rejections = [];
      }

      existingRequest.rejections.push(previlage);

      await existingRequest.save();

      return new Response(`Rejected successfully ${arrLength} requests`, {
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
