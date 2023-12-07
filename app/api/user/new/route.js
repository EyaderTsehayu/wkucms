import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";

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
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectToDB();
    const newUser = new User({
      userId,
      firstname,
      middlename,
      lastname,
      password: hashedPassword,
      collegeId,
      departmentId,
      staffId,
      officeName,
      year,
      role,
    });

    console.log(
      userId,
      firstname,
      middlename,
      lastname,
      hashedPassword,
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
    console.log(error);
    return new Response("Faild to create a new user", { status: 500 });
  }
};
