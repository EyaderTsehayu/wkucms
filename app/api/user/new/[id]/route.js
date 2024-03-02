
// import { connectToDB } from "@/utils/database";
// import User from "@/models/user";


// export const GET = async (request, { params }) => {
//   try {
//     // Get the user session
//     // const session = await getServerSession();
//     // console.log("session from studentApproval", session?.user?.privilege);

//     await connectToDB();

//     // Uncomment the following line if you want to use clearanceId from params
//     // const clearanceId = params.id;

//     // Or if you want to use clearanceId from request.query, uncomment the following line
//     // const { clearanceId } = request.query;

//     // Log the clearanceId
//      console.log("staffUserId", params.id );

//     const requests = await User.find({ userId: params.id });

//     // Return a success response with the users data
//     return new Response(JSON.stringify(requests), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching requests:", error);
//     // Return an error response
//     return new Response("Failed to fetch requests", { status: 500 });
//   }
// };
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (request, { params }) => {
  try {
    // Get the user session
    // const session = await getServerSession();
    // console.log("session from studentApproval", session?.user?.privilege);
    console.log("userId ", params.id)
    await connectToDB();
    const users = await User.findOne({ userId: params.id });
    console.log("users ", users)
    // console.log("ojjbshvcxcgzxcvg",users);
    // Return a success response with the users data
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Return an error response
    return new Response("Failed to fetch users", { status: 500 });
  }
};


