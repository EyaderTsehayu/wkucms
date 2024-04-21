import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import History from "@/models/history";
import StepSchema from "@/models/step";
import { STUDENTSTEPS } from "@/utils/constants";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
// const studentApproval = STUDENTSTEPS;
//var studentApproval;
export const PATCH = async (request) => {
  const session = await getServerSession(authOptions);
  const privilege = session?.user?.privilege;
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();

    // first fetch the steps
    // const steps = await StepSchema.findOne({ stepType: "STUDENT" });
    //studentApproval = steps.steps;

    const stages = {
      Head: ["College Dean"],
      "College Dean": [
        "Dormitory",
        "Cafteria",
        "Sport And Recreation",
        "College Book Store",
      ],
      Dormitory: ["Dean Of Student"],
      Cafteria: ["Dean Of Student"],
      "Sport And Recreation": ["Dean Of Student"],
      "College Book Store": ["Library Chief"],
      "Dean Of Student": ["Registrar"],
      "Library Chief": ["Registrar"],
      Registrar: ["APPROVED"],
    };

    const existingRequest = await StudentClearnceReq.findById(objectId);

    if (existingRequest) {
      const currentStatus = existingRequest.status;
      const nextApprovers = stages[privilege];
      // const currentaprover = existingRequest.approvals;
      // console.log("current status ", currentStatus);
      // console.log("current approver ", currentaprover);
      // console.log("Next approver", nextApprovers);

      const approvalTime = new Date(); // Get the current time for approval

      if (!existingRequest.approvals) {
        existingRequest.approvals = []; // Initialize approvals array if it doesn't exist
      }

      if (Array.isArray(currentStatus) && currentStatus.length > 1) {
        existingRequest.approvals.push({ role: privilege, time: approvalTime });
        if (currentStatus.indexOf(nextApprovers[0]) == -1) {
          currentStatus.push(nextApprovers[0]);
        }
        const newStatus = currentStatus.filter((item) => item !== privilege);
        existingRequest.status = newStatus;
      } else if (nextApprovers && nextApprovers.length == 1) {
        existingRequest.status = nextApprovers[0];
        existingRequest.approvals.push({ role: privilege, time: approvalTime });
      } else if (nextApprovers && nextApprovers.length > 1) {
        existingRequest.status = nextApprovers;
        existingRequest.approvals.push({ role: privilege, time: approvalTime });
      }

      await existingRequest.save();

      // Create new document in History collection if status is APPROVED
      if (existingRequest.status.includes("APPROVED")) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        });

        const clearanceReq = new History({
          userId: existingRequest.userId,
          firstname: existingRequest.firstname,
          middlename: existingRequest.middlename,
          reason: existingRequest.reason,
          status: "Approved",
          role: existingRequest.role,
          dateApproved: formattedDate,
          dateRequested: existingRequest.dateRequested,
          clearanceId: existingRequest._id,
        });
        await clearanceReq.save();
      }

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
