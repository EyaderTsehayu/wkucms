import { connectToDB } from "@/utils/database";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import User from "@/models/user";

export const POST = async (req) => {
  const {
    userId,
    firstname,
    middlename,
    reason,
    attachedFile,
    status,
    role,
    collegeName,
    departmentName,
    _userId,
  } = await req.json() ;
  const requests = await StudentClearnceReq.find({ userId: userId });
  if (requests.length > 0 && requests != null) {
    return new Response(
      `Cannot request clearance. An active request is already in progress`,
      { status: 201 }
    );
  }

  // fetch the logged user data for getting the blockNo
  const fetchStudent = await User.find({ userId: userId });
  // console.log("fetchStudent from dorm", fetchStudent[0].blockNo, privilage);

  // Get the current date
  const today = new Date();

  // Format the date as "DD/MM/YY"
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  console.log("formattedDate");
  try {
    await connectToDB();
    const clearanceReq = new StudentClearnceReq({
      userId,
      firstname,
      middlename,
      reason,
      attachedFile,
      status,
      role,
      collegeName,
      departmentName,
      _userId,
      blockNo: fetchStudent[0].blockNo,
      dateRequested: formattedDate,
    });
    console.log("attachedFile", attachedFile);

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
//     const requests = await StudentClearnceReq.find();

//     // Return a success response with the users data
//     return new Response(JSON.stringify(requests), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching requests:", error);

//     // Return an error response
//     return new Response("Failed to fetch requests", { status: 500 });
//   }
// };
