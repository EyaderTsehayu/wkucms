import { connectToDB } from "@/utils/database";
import Office from "@/models/office";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const {
    officeId,
    officeName,

    password,

    location,
    items
   
  } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectToDB();
    const newOffice = new Office({
        officeId,
        officeName,
        password: hashedPassword ,
        location,
        items
    });

    console.log(
        officeId,
        officeName,
        hashedPassword,
        location,
        items
    );
    await newOffice.save();
    return new Response(JSON.stringify(newOffice), { status: 201 });
  } catch (error) {
    return new Response("Faild to create a new office", { status: 500 });
    console.log(error);
  }
};
