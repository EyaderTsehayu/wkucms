import { connectToDB } from "@/utils/database";
import StaffRequestSchema from "@/models/staffClearanceRequest";

export const POST = async (req) => {
  const { userId,
    reason,
    attachedFile,
    status,
    firstname,
    middlename,
    role,
    collegeName,
    departmentName,
    _userId,
     

  } = await req.json();
  const requests = await StaffRequestSchema.find({ userId: userId });
  console.log("pkyrsf", status);
  if (requests.length > 0 && requests != null) {
    return new Response(
      `Cannot request clearance. An active request is already in progress`,
      { status: 201 }
    );
  }


  // Get the current date
  const today = new Date();

  // Format the date as "DD/MM/YY"
  const formattedDate = today.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
  console.log("formattedDate");
  try {
    await connectToDB();
    const clearanceReq = new StaffRequestSchema({
      userId,
      reason,
      attachedFile,
      status,
      firstname,
      middlename,
      collegeName,
      departmentName,
      _userId,
      role,
      dateRequested: formattedDate
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
