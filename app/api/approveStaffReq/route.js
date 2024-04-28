import { connectToDB } from "@/utils/database";
import StaffClearnceReq from "@/models/staffClearanceRequest";
import { STAFFSTEPS } from "@/utils/constants";
import StepSchema from "@/models/step";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import DynamicSteps from "@/models/DynamicSteps";

// const staffApproval = STAFFSTEPS;
let staffApproval;

export const PATCH = async (request) => {
  let stepType="";
  let step ={};
  const session = await getServerSession(authOptions);
  const privilege = session?.user?.privilege;
  try {
    const { objectId, arrLength } = await request.json();

    await connectToDB();
    const existingRequest = await StaffClearnceReq.findById(objectId);

    if (existingRequest && existingRequest.staffType == "ACADEMIC") {
      stepType = "ACADEMIC";
      const requests = await DynamicSteps.find({stepType: stepType});
         //return new Response(JSON.stringify(requests), { status: 200 })
      // console.log("studentData from myclearance on", requests);
       
         requests.forEach((data, index) => {
          step[data.name] = data.nextSteps;
         }
       );
      }else if (existingRequest && existingRequest.staffType == "ADMIN") {
        stepType = "ADMIN";
        const requests = await DynamicSteps.find({stepType: stepType});
          //return new Response(JSON.stringify(requests), { status: 200 })
        // console.log("studentData from myclearance on", requests);
         
          requests.forEach((data, index) => {
            step[data.name] = data.nextSteps;
          }
        );
      }



// FETCH ACEDEMIC STEPS

   


   


    // first fetch the steps
    // const steps = await StepSchema.findOne({ stepType: "STUDENT" });
    //studentApproval = steps.steps;

    const academicStep = {
      Head: "College Dean",
      "College Dean": [
        "Library Chief1",
        "Library Chief2",
        "Library Chief3",
        "Accountant",
        "Store Keeper (Electronics)",
        "Store Keeper (Furniture)",
        "Store Keeper (Ender/SemiEnder)",
        "Teachers and Staff Savings Association Accountant",
        "Registrar",
        "Housing Management Coordinator",
        "University Industry Linkage Directorate",
        "Community Service Directorate",
        "Indigenous Knowledge Directorate",
        "Research Directorate",
      ],

      "Library Chief1": ["Library Director"],
      "Library Chief2": ["Library Director"],
      "Library Chief3": ["Library Director"],
      Accountant: ["Main Treasurer"],
      "Library Director": ["Human Resource Management Directorate"],
      "Main Treasurer": ["Finance Directorate"],
      "Finance Directorate": ["Human Resource Management Directorate"],

      "Store Keeper (Electronics)": [
        "Procurement and Asset Management Directorate",
      ],
      "Store Keeper (Furniture)": [
        "Procurement and Asset Management Directorate",
      ],
      "Store Keeper (Ender/SemiEnder)": [
        "Procurement and Asset Management Directorate",
      ],
      "Procurement and Asset Management Directorate": [
        "Human Resource Management Directorate",
      ],

      "Teachers and Staff Savings Association Accountant": [
        "Human Resource Management Directorate",
      ],
      Registrar: ["Human Resource Management Directorate"],

      "Housing Management Coordinator": [
        "Human Resource Management Directorate",
      ],

      "University Industry Linkage Directorate": [
        "Research and Community Service Vice President",
      ],
      "Community Service Directorate": [
        "Research and Community Service Vice President",
      ],
      "Indigenous Knowledge Directorate": [
        "Research and Community Service Vice President",
      ],
      "Research Directorate": ["Research and Community Service Vice President"],

      "Research and Community Service Vice President": [
        "Academic Affairs Vice president",
      ],

      "ICT Directorate": ["Human Resource Management Directorate"],

      "Academic Affairs Vice president": [
        "Administration Corporate Management Vice President",
      ],
      "Administration Corporate Management Vice President": [
        "Records and Archives Officer",
      ],
      "Records and Archives Officer": ["Human Resource Management Directorate"],
      "Human Resource Management Directorate": ["APPROVED"],
    };

    const adminStep = {
      Director: [
        "Library Chief1",
        "Library Chief2",
        "Library Chief3",
        "Accountant",
        "Store Keeper (Electronics)",
        "Store Keeper (Furniture)",
        "Store Keeper (Ender/SemiEnder)",
        "Teachers and Staff Savings Association Accountant",
        "Dean Of Student",
        "Housing Management Coordinator",
        "University Industry Linkage Directorate",
        "Community Service Directorate",
        "Indigenous Knowledge Directorate",
        "Research Directorate",
        "ICT Directorate",
      ],

      "Library Chief1": ["Library Director"],
      "Library Chief2": ["Library Director"],
      "Library Chief3": ["Library Director"],
      Accountant: ["Main Treasurer"],

      "Store Keeper (Electronics)": [
        "Procurement and Asset Management Directorate",
      ],
      "Store Keeper (Furniture)": [
        "Procurement and Asset Management Directorate",
      ],
      "Store Keeper (Ender/SemiEnder)": [
        "Procurement and Asset Management Directorate",
      ],

      "Teachers and Staff Savings Association Accountant": [
        "Human Resource Management Directorate",
      ],
      "Dean Of Student": ["Human Resource Management Directorate"],

      "Housing Management Coordinator": [
        "Human Resource Management Directorate",
      ],

      "University Industry Linkage Directorate": [
        "Research and Community Service Vice President",
      ],
      "Community Service Directorate": [
        "Research and Community Service Vice President",
      ],
      "Indigenous Knowledge Directorate": [
        "Research and Community Service Vice President",
      ],
      "Research Directorate": ["Research and Community Service Vice President"],
      "ICT Directorate": ["Human Resource Management Directorate"],

      "Library Director": ["Human Resource Management Directorate"],
      "Main Treasurer": ["Finance Directorate"],
      "Finance Directorate": ["Human Resource Management Directorate"],
      "Procurement and Asset Management Directorate": [
        "Human Resource Management Directorate",
      ],
      "Research and Community Service Vice President": [
        "Academic Affairs Vice president",
      ],

      "Academic Affairs Vice president": [
        "Administration Corporate Management Vice President",
      ],
      "Administration Corporate Management Vice President": [
        "Records and Archives Officer",
      ],
      "Records and Archives Officer": ["Human Resource Management Directorate"],
      "Human Resource Management Directorate": ["APPROVED"],
    };

    

    if (existingRequest && existingRequest.staffType == "ACADEMIC") {
      const currentStatus = existingRequest.status;
      const nextApprovers = academicSteps[privilege];

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
    } else if (existingRequest && existingRequest.staffType == "ADMIN") {
      const currentStatus = existingRequest.status;
      const approvalRoles = existingRequest.approvals.map(
        (approval) => approval.role
      );

      //if existingRequest.director is inside existingRequest.approvals.role concatinate nextapprover with adminStep[director]
      let nextApprovers;
      function isDirectorInApprovals() {
        for (let approval of existingRequest.approvals) {
          if (approval.role === existingRequest.director) {
            return true; // If found, return true
          }
        }
        return false; // If not found, return false
      }
      const isDirectorApproved = isDirectorInApprovals();
      if (!isDirectorApproved) {
        if (adminSteps["Director"].includes(existingRequest.director)) {
          nextApprovers = adminSteps["Director"].filter(
            (role) => role !== existingRequest.director
          );

          nextApprovers = nextApprovers.concat(
            adminSteps[existingRequest.director]
          );
        } else {
          nextApprovers = adminSteps[privilege].concat(adminSteps["Director"]);
        }
      } else {
        // console.log("Director is approved");
        nextApprovers = adminSteps[privilege];
      }

      const approvalTime = new Date(); // Get the current time for approval

      if (Array.isArray(currentStatus) && currentStatus.length > 1) {
        existingRequest.approvals.push({
          role: privilege,
          time: approvalTime,
        });

        nextApprovers = nextApprovers.filter(
          (role) => !approvalRoles.includes(role)
        );

        if (
          nextApprovers.length > 0 &&
          currentStatus.indexOf(nextApprovers[0]) == -1
        ) {
          currentStatus.push(nextApprovers[0]);
        }
        const newStatus = currentStatus.filter((item) => item !== privilege);
        existingRequest.status = newStatus;
      } else if (nextApprovers && nextApprovers.length == 1) {
        existingRequest.status = nextApprovers[0];
        existingRequest.approvals.push({
          role: privilege,
          time: approvalTime,
        });
      } else if (nextApprovers && nextApprovers.length > 1) {
        existingRequest.status = nextApprovers;
        existingRequest.approvals.push({
          role: privilege,
          time: approvalTime,
        });
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
