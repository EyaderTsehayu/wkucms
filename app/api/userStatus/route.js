import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ROLES } from "@/utils/constants";
import StaffClearnceReq from "@/models/staffClearanceRequest";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.userId;
  const role = session?.user?.role;
  try {
    await connectToDB();
    let request;
    if (role == ROLES.STUDENT) {
      request = await StudentClearnceReq.find({ userId: id });
    } else {
      request = await StaffClearnceReq.find({ userId: id });
    }

    //   console.log("session from studentApproval ",requests)

    // Return a success response with the users data
    return new Response(JSON.stringify(request), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
