import { connectToDB } from "@/utils/database";
import StaffRequestSchema from "@/models/staffClearanceRequest";

export const POST = async (req) => {
  const { userId, reason, status, firstname, middlename, role } =
    await req.json();
  const requests = await StaffRequestSchema.find({ userId: userId });

  if (requests.length > 0 && requests != null) {
    return new Response(
      `Cannot request clearance. An active request is already in progress`,
      { status: 201 }
    );
  }

  try {
    await connectToDB();
    const clearanceReq = new StaffRequestSchema({
      userId,
      reason,
      status,
      firstname,
      middlename,
      role,
    });

    await clearanceReq.save();
    return new Response(`Request sent Successfully!`, {
      status: 201,
    });
  } catch (error) {
    console.error("Error on requseting clearance:", error);
    return new Response("Failed to requset new clearance", {
      status: 500,
    });
  }
};

// export const GET = async () => {
//   try {
//     // Connect to the database
//     await connectToDB();

//     // Fetch all users from the database
//     const requests = await StaffRequestSchema.find();

//     // Return a success response with the users data
//     return new Response(JSON.stringify(requests), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching requests:", error);

//     // Return an error response
//     return new Response("Failed to fetch requests", { status: 500 });
//   }
// };
