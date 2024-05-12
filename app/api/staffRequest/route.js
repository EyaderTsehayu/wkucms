import { connectToDB } from "@/utils/database";
import StaffRequestSchema from "@/models/staffClearanceRequest";
import StudentClearnceReq from "@/models/studentClearanceRequest";
import { toast } from "react-toastify";

export const POST = async (req) => {
  const {
    userId,
    reason,
    attachedFile,
    status,
    firstname,
    middlename,
    role,
    collegeName,
    departmentName,
    _userId,
    staffType,
    guarantorName,
    guarantorId,
    director
  } = await req.json();
  const requests = await StaffRequestSchema.find({ userId: userId });

  if (requests.length > 0 && requests != null) {
    return new Response(
      `Cannot request clearance. An active request is already in progress`,
      { status: 201 }
    );
  }

  // Get the current date
  const today = new Date();

  // Format the date as "DD/MM/YY"
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

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
      staffType,
      director,
      dateRequested: formattedDate,
      guarantorName,
      guarantorId,
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

// implement the Delete method
export const DELETE = async (req) => {
  const { objectId,role } = await req.json();

  try {
    await connectToDB();
    if(role=="STUDENT"){
      const deleteRequest =await StudentClearnceReq.findByIdAndDelete(objectId);
     
    }else{
      const deleteRequest =await StaffRequestSchema.findByIdAndDelete(objectId);
    }
    if (deleteRequest) {
      toast.success("Sorry, your request has expired, and you can make a new request.");
      return new Response(`Request deleted successfully!`, {
        status: 200,
      });
    }
    return new Response("Request not found", { status: 404 });
  } catch (error) {
    console.error("Error deleting request:", error);
    return new Response("Failed to delete request", {
      status: 500,
    });
  }
};