import { connectToDB } from "@/utils/database";
import StaffRequestSchema from "@/models/staffClearanceRequest";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/user";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const privilege = session?.user?.privilege;
  const id = session?.user?.userId;
  const collegeName = session?.user?.collegeName;
  const departmentName = session?.user?.departmentName;
  // const director = session?.user?.director;
  let director;

  try {
    await connectToDB();
    // first fetch myprofile to get the director name
    const myprofile = await User.find({ userId: id });
    if (myprofile.length == 0) {
      return new Response("User not found", { status: 404 });
    }

    director = myprofile[0].director;

    const requests =
      director ?
        await StaffRequestSchema.find({
          status: privilege,
          userId: { $ne: id },
         
        })
        : (collegeName &&( privilege == "College Dean" || privilege == "College Registrar"))
          ? await StaffRequestSchema.find({
            status: privilege,
            userId: { $ne: id },
            collegeName: collegeName,

          })
          :(departmentName && privilege == "Head")
            ? await StaffRequestSchema.find({
              status: privilege,
              userId: { $ne: id },
              departmentName: departmentName,
            })
            : await StaffRequestSchema.find({
              status: privilege,
              userId: { $ne: id },
            });

    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
