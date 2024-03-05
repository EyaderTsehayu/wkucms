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
// Configure multer to handle file uploads

// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ storage: storage });
export const PATCH = async (request) => {
  try {
    const { objectId, email, userId, password,profilePicture } = await request.json();
    console.log("profilePic", profilePicture)

    await connectToDB();
    //     // first fetch the steps
    // Check if the request contains a file
    // if (request.files && request.files.length > 0) {
      // Handle image upload
      // const imageBuffer = request.files[0].buffer;
      // Save or process the image buffer as needed
      // For example, you can save it to a user-specific folder or a cloud storage service
     // const profilePic = imageBuffer.toString("base64"); // Convert image buffer to base64 string
   // }
    console.log("objectId", userId, "userId", userId, "previlege", userId)
    // const editUser = await StepSchema.findOne({ userId:userId});
    //   // Fetch the user by userId

    const updatedUser = email ? await User.findOneAndUpdate({ userId: userId }, { email: email })
      : password ? await User.findOneAndUpdate({ userId: userId }, { password: password })
        :profilePicture? await User.findOneAndUpdate({ userId: userId }, { profilePic: profilePicture })
        :await User.find({ userId: userId });

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


// Import necessary modules

// import multer from "multer";

// // Configure multer to handle file uploads
// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ storage: storage });

// export const PATCH = async (request) => {
//   try {
//     // Extract information from the JSON body
//     const { userId, email, password } = await request.json();
//     console.log("image  ", request.files[0].buffer)
//     // Connect to the database
//     await connectToDB();

//     // Create an object to store updated fields
//     const updatedFields = {};

//     // Check if there are updated fields
//     if (email) {
//       updatedFields.email = email;
//     }
//     if (password) {
//       updatedFields.password = password;
//     }

//     // Check if the request contains a file
//     if (request.files && request.files.length > 0) {
//       // Handle image upload
//       const imageBuffer = request.files[0].buffer;
//       // Save or process the image buffer as needed
//       // For example, you can save it to a user-specific folder or a cloud storage service
//       updatedFields.profilePic = imageBuffer.toString("base64"); // Convert image buffer to base64 string
//     }

//     // Find and update the user document based on userId
//     const updatedUser = await User.findOneAndUpdate({ userId: userId }, { $set: updatedFields }, { new: true });

//     if (!updatedUser) {
//       return new Response("User not found", { status: 404 });
//     }

//     // Success message (optional)
//     console.log(`User with ID ${userId} updated successfully`);

//     return new Response("User updated successfully", { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response("Failed to update user", { status: 500 });
//   }
// };

// Apply multer middleware to the PATCH route
// export const config = {
//   api: {
//     bodyParser: false, // Disable the default bodyParser
//   },
// };

// export default upload.single("profilePic")(PATCH);
