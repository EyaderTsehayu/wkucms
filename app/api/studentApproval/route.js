import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const privilage = session?.user?.privilege;
  const collegeName=session?.user?.collegeName;
  const departmentName=session?.user?.departmentName;
  
  console.log("session from studentApproval ",collegeName,'rtyey',departmentName);
  try {
    await connectToDB();  

    const requests = await StudentClearnceReq.find({ status: privilage,collegeName:collegeName,departmentName:departmentName });

    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
