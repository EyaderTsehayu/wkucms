import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  const {
    userId,
    firstname,
    middlename,
    lastname,
    collegeId,
    departmentId,
    year,
    role,
  } = await req.json();
  try {
    await connectToDB();
    const newUser = new User({
      userId,
      firstname,
      middlename,
      lastname,
      collegeId,
      departmentId,
      role,
      year,
    });

    console.log(
      userId,
      firstname,
      middlename,
      lastname,
      role,
      collegeId,
      departmentId,
      year,
      role
    );
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Faild to create a new user", { status: 500 });
    console.log(error);
  }
};
