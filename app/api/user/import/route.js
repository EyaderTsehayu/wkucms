import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  try {
    await connectToDB();

    const data = await req.json();
    console.log(data);
    let count = 0;
    for (const userData of data) {
      const newUser = new User({
        userId: userData["Student Id"],
        firstname: userData["First Name"],
        middlename: userData["Middle Name"],
        lastname: userData["Last Name"],
        collegeId: userData["College Id"],
        departmentId: userData["Department Id"],
        year: userData["Year"],
        role: userData["Role"],
        // Map each property to the corresponding field in your User model
      });
      //  console.log(studentId, firstName, last);
      await newUser.save();
      count++;
    }

    // return res.status(201).json({ message: "Users created successfully" });
    return new Response(`${count} users added successfully`, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Faild to create a new user", { status: 500 });
    //return res.status(500).json({ message: "Failed to create users" });
  }
};
//In this ca

// import User from "@/models/user";
// import { connectToDB } from "@/utils/database";

// export const POST = async (req) => {
//   const parsedData = req.body; // Assuming parsedData is sent in the request body

// };
