import { connectToDB } from "@/utils/database";
import Admin from "@/models/admin";

export const POST = async (req) => {
  const {
    adminId,
    firstName,
    middleName,
    lastName,
    officeName,
    role,
  } = await req.json();
  try {
    await connectToDB();
    const newAdmin = new Admin({
        adminId,
        firstName,
        middleName,
        lastName,
        officeName,
        role,
    });

    console.log(
        adminId,
        firstName,
        middleName,
        lastName,
        officeName,
        role,
    );
    await newAdmin.save();
    return new Response(JSON.stringify(newAdmin), { status: 201 });
  } catch (error) {
    return new Response("Faild to create a new admin", { status: 500 });
    console.log(error);
  }
};
