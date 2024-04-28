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
  let registrarName ;
  const userId = session?.user?.userId;

  try {
    await connectToDB();
    const myprofile = await User.find({ userId: userId });
    if (myprofile.length == 0) {
      return new Response("User not found", { status: 404 });
    }
    
    registrarName = myprofile[0].registrarName;

    const fetchStudent = await User.find({ userId: userId });
    // console.log("fetchStudent for dorm", privilege);

    // find all requests where the previlage is included inside the status array which is one field in the schema
    const requests =
       registrarName
        ? await StudentClearnceReq.find({
            status: privilege,
            registrarName: registrarName,
          })
        : collegeName
        ? await StudentClearnceReq.find({
            status: privilege,
            collegeName: collegeName,
          })
        : departmentName 
        ? await StudentClearnceReq.find({
            status: privilege,
            departmentName: departmentName,
          })
        : privilege == "Dormitory"
        ? await StudentClearnceReq.find({
            status: privilege,
            blockNo: fetchStudent[0].blockNo,
          })
        : await StudentClearnceReq.find({ status: privilege });

    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
   