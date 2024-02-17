import { connectToDB } from "@/utils/database";
import Office from "@/models/office";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const {
    officeId,
    officeName,
    password,
    location,
    items,
    type,
    status
  } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectToDB();
    const newOffice = new Office({
      officeId,
      officeName,
      password: hashedPassword,
      location,
      items,
      type,
      status
    });

    console.log(
      officeId,
      officeName,
      hashedPassword,
      location,
      items,
      type,
      status
    );
    await newOffice.save();
    return new Response(JSON.stringify(newOffice), { status: 201 });
  } catch (error) {
    console.error('Error creating a new office:', error);
    return new Response("Failed to create a new office", { status: 500 });
  }
};


export const GET=async()=>{
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all users from the database
    const offices = await Office.find();

    // Return a success response with the users data
    return new Response(JSON.stringify(offices), { status: 200 });
  } catch (error) {
    console.error("Error fetching offices:", error);

    // Return an error response
    return new Response("Failed to fetch offices", { status: 500 });
  }
}
