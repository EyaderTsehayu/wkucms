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
  const userId = session?.user?.userId;
  console.log("session from studentApproval ", collegeName, 'rtyey', departmentName);
  try {
    await connectToDB();



    const fetchStudent = await User.find({ userId: userId });
    console.log("fetchStudent for dorm", privilege);


    const requests = collegeName && departmentName
      ? await StudentClearnceReq.find({ status: privilege, collegeName: collegeName, departmentName: departmentName })
      : collegeName
        ? await StudentClearnceReq.find({ status: privilege, collegeName: collegeName })
        : privilege == "Dormitory"
          ? await StudentClearnceReq.find({ status: privilege, blockNo: fetchStudent[0].blockNo })
          : await StudentClearnceReq.find({ status: privilege });
   
   
    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });

  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
