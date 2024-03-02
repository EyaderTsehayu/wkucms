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
    collegeName,
    departmentName,
    staffId,
    officeName,
    year,
    role,
    privilege,
    email
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
      collegeName,
      departmentName,
      staffId,
      officeName,
      year,
      role,
      privilege,
      email
    });

    console.log(
      userId,
      firstname,
      middlename,
      lastname,
      hashedPassword,
      collegeName,
      departmentName,
      staffId,
      officeName,
      year,
      role,
      privilege,
      email
    );
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Faild to create a new user", { status: 500 });
  }

};



// const staffApproval = STAFFSTEPS;

export const PATCH = async (request) => {
  try {
    const {objectId,email,userId } = await request.json();
  
    await connectToDB();
    // first fetch the steps
    
    console.log("objectId",objectId,"userId",userId,"previlege",email)
    // const editUser = await StepSchema.findOne({ userId:userId});
    //   // Fetch the user by userId
      const  updatedUser = await User.findOneAndUpdate({ userId: userId }, { email:email });

      if (!updatedUser) {
        return new Response("User not found", { status: 404 });
      }
  
      // Success message (optional)
      console.log(`email updated for user with ID: ${userId}`);
  
      return new Response("email updated successfully", { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Failed to update email", { status: 500 });
    }
   
 
};