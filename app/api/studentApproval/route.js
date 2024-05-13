import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import User from "@/models/user";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const privilege = session?.user?.privilege;
  const collegeName = session?.user?.collegeName;
  const departmentName = session?.user?.departmentName;
  // let registrarName ;
  const userId = session?.user?.userId;

  try {
    await connectToDB();
    // const myprofile = await User.find({ userId: userId });

    // registrarName = myprofile[0].registrarName;

    const fetchStudent = await User.find({ userId: userId });
    if (fetchStudent.length == 0) {
      return new Response("User not found", { status: 404 });
    }
    const forApprovals = await StudentClearnceReq.find({
      status: privilege,
    });

    const request = [];
    
    for (const approvalEntry of forApprovals) {
      // console.log("approvalEntry", approvalEntry);
      let inRejections = false;
      const rejected = approvalEntry.rejections;
      const userFromRequests = approvalEntry.userId;
      inRejections = rejected.includes(privilege);
      console.log(
        "rejected",
        rejected,
        approvalEntry.firstname,
        approvalEntry.middlename,
        "privilege",
        privilege,
        "is in rejections",
        inRejections
      );
      // console.log("fetchStudent for dorm", privilege);
      // find all requests where the previlage is included inside the status array which is one field in the schema
      // const requests =
      //     ((collegeName && !inRejections) &&( privilege == "College Dean" || privilege == "College Registrar"))
      //     ? await StudentClearnceReq.find({
      //         status: privilege,
      //         collegeName: collegeName,
      //       })
      //     :(departmentName && !inRejections && privilege == "Head")
      //     ? await StudentClearnceReq.find({
      //         status: privilege,
      //         departmentName: departmentName,
      //       })
      //     : privilege == "Dormitory" && !inRejections
      //     ? await StudentClearnceReq.find({
      //         status: privilege,
      //         blockNo: fetchStudent[0].blockNo,
      //       })
      //     :!inRejections
      //     ? await StudentClearnceReq.find({ status: privilege })
      //     : [];

      let requests=[];

      if (
        collegeName &&
        !inRejections &&
        (privilege === "College Dean" || privilege === "College Registrar")
      ) {
        requests = await StudentClearnceReq.find({
          status: privilege,
          collegeName: collegeName,
          userId: userFromRequests,
        });
      } else if (departmentName && !inRejections && privilege === "Head") {
        requests = await StudentClearnceReq.find({
          status: privilege,
          departmentName: departmentName,
          userId: userFromRequests,
        });
      } else if (privilege === "Dormitory" && !inRejections) {
        requests = await StudentClearnceReq.find({
          status: privilege,
          blockNo: fetchStudent[0].blockNo,
          userId: userFromRequests,
        });
      } else if (!inRejections){
        requests = await StudentClearnceReq.find({ 
          status: privilege ,
          userId: userFromRequests,
        });
      }

      if(!request.includes(requests)){

        request.push(...requests);
      }
    }
    // Return a success response with the users data
    return new Response(JSON.stringify(request), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
