import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  const {
    userId,
    firstname,
    middlename,
    lastname,
    password,
    collegeId,
    departmentId,
    staffId,
    officeName,
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
      password,
      collegeId,
      departmentId,
      role,
      year,
      staffId,
      officeName,
    });

    console.log(
      userId,
      firstname,
      middlename,
      lastname,
      password,
      role,
      collegeId,
      departmentId,
      staffId,
      officeName,
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
