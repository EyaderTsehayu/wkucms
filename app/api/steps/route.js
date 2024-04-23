import { connectToDB } from "@/utils/database";
import DynamicSteps from "@/models/DynamicSteps";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { KeyOutlined } from "@mui/icons-material";
export const POST = async (req) => {
  try {
    await connectToDB();
    // const {
    //     title,
    //     description,
    //     image,
    //   } = await req.json();
    const { steps, stepType, key, value } = await req.json(); // Extract the 'steps' array from the request body
    console.log("steps", steps);

    // Iterate over each step and create a document for each one
    if (steps) {
      const keys = Object.keys(steps);
      const values = Object.values(steps);

      const len = keys.length;
      //   const newStep = new DynamicSteps({ steps: newSteps });
      await populateSteps(steps, stepType);
    } else if (key && value) {
      console.log("key", key, ">value", value);
      const currentStep = new DynamicSteps({
        name: key,
        nextSteps: value,
        stepType,
      });
      await currentStep.save();
    }
    return new Response(`Request sent Successfully!`, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};
//     + - * / = =0[]

// Helper function to iterate and create Step documents
async function populateSteps(data, stepType) {
  //   const keys = Object.keys(data);
  for (const key in data) {
    if (data[key] != null) {
      console.log("data", data);

      console.log(data[key]);
      const currentStep = new DynamicSteps({
        name: key,
        nextSteps: data[key],
        stepType,
      });
      await currentStep.save();
    }

    // Recursively create documents for next steps
    //   if (data[key].length > 0) {
    //       await populateSteps(Object.fromEntries(data[key].map(step => [step, []])));
    //   }
  }
  // }
}

export const GET = async (request) => {
  // Parse the stepType from the URL query parameters
  const params = new URL(request.url).searchParams;
  const stepType = params.get("stepType");

  const session = await getServerSession(authOptions);
  const privilage = session?.user?.privilege;
  // console.log("sendtoapi", stepType);

  // console.log("session from studentApproval ", session?.user?.privilege)
  try {
    await connectToDB();

    const requests = await DynamicSteps.find({stepType: stepType});

    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);

    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};

export const PATCH = async (request) => {
  try {
    const { key, value, stepType } = await request.json();
    console.log("key", key, "value", value, "stepType", stepType);
    await connectToDB();

    const updateSteps = await DynamicSteps.findOne({
      // stepType: stepType,
      name: key,
    });

    if (updateSteps) {
      // updateSteps.name = key;
      updateSteps.nextSteps = value;
       updateSteps.stepType = stepType;
      await updateSteps.save();

      return new Response(`Staff updated successfully`, {
        status: 201,
      });
    } else {
      return new Response("Request not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to modify the steps", { status: 500 });
  }
};
