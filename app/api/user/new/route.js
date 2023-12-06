import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const {
    userId,
      adminId,
      firstname,
      middlename,
      lastname,

      password,

      collegeId,
      departmentId,
      staffId,
      officeName,
      year,
      role
  } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectToDB();
    const newUser = new User({
      userId,
      adminId,
      firstname,
      middlename,
      lastname,
      password: hashedPassword ,
      collegeId,
      departmentId,
      staffId,
      officeName,
      year,
      role
    });

    console.log(
      userId,
      adminId,
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
    return new Response("Faild to create a new user", { status: 500 });
    console.log(error);
  }
};

// export async function GET() {
//   await connectToDB();
//   const users = await User.find();
//   return NextResponse.json({ user});
// }
export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all users from the database
    const users = await User.find();

    // Return a success response with the users data
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Return an error response
    return new Response("Failed to fetch users", { status: 500 });
  }
}
