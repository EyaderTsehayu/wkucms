import { connectToDB } from "@/utils/database";
import History from "@/models/history";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export const POST = async (req) => {
// Get the current date
const today = new Date();

// Format the date as "DD/MM/YY"
const formattedDate = today.toLocaleDateString('en-US', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
});

  const { userId, firstname, middlename, reason, status, role,dateRequested,clearanceId} =
    await req.json();
  const requests = await History.find({ userId: userId,clearanceId:clearanceId});

  if (requests.length > 0 && requests != null) {
    return null;
  
  }

  try {
    await connectToDB();
    const clearanceReq = new History({
      userId,
      firstname,
      middlename,
      reason,
      status,
      role,
      dateApproved:formattedDate,
      dateRequested,
      clearanceId
    });

    await clearanceReq.save();
    return new Response(`Create Clearance History Successfully!`, {
      status: 201,
    });
  } catch (error) {
    console.error("Error on requseting clearance:", error);
    return new Response("Failed to requset new clearance", {
      status: 500,
    });
  }

};

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userId=session?.user?.userId;
  
   console.log("session from studentApproval ",session?.user?.privilege)
  try {

    await connectToDB();
   
    const requests = await History.find({ userId:userId});


    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};



