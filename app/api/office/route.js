import { connectToDB } from "@/utils/database";
import Office from "@/models/office";

export const POST = async (req) => {
  const {
    officeId,
    officeName,
    location,
    items
   
  } = await req.json();
  try {
    await connectToDB();
    const newOffice = new Office({
        officeId,
        officeName,
        location,
        items
    });

    console.log(
        officeId,
        officeName,
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
