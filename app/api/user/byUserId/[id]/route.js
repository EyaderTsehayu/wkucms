import User from "@/models/user";
import { connectToDB } from "@/utils/database";

// GEt

export const GET = async (request, { params }) => {
 console.log("params", params.id);
  try {
    await connectToDB();
    const user = await User.find({
      userId: params.id,
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", {
      status: 500,
    });
  }
};
