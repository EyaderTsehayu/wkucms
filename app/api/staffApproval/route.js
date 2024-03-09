
import { connectToDB } from "@/utils/database";
import StaffRequestSchema from "@/models/staffClearanceRequest";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const privilage = session?.user?.privilege;
  const id = session?.user?.userId;
  const collegeName = session?.user?.collegeName;
  const departmentName = session?.user?.departmentName;

  // console.log("privilageprivilage", privilage)
  // console.log("session from studentApproval ", session?.user?.privilege)
  try {

    await connectToDB();

    const requests = collegeName && departmentName
      ? await StaffRequestSchema.find({ status: privilage, userId: { $ne: id }, collegeName: collegeName, departmentName: departmentName })
      : collegeName
        ? await StaffRequestSchema.find({ status: privilage, userId: { $ne: id }, collegeName: collegeName })
        : await StaffRequestSchema.find({ status: privilage, userId: { $ne: id } })



    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
