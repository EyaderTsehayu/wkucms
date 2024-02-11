import { connectToDB } from "@/utils/database";
import StepSchema from "@/models/step";

export const PATCH = async (request) => {
  try {
    const { stepType, updatedSteps } = await request.json();

    console.log("Step Type:", stepType);
    console.log("Updated Steps:", updatedSteps);

    await connectToDB();

    const updateSteps = await StepSchema.findOne({ stepType: stepType });

    console.log("Existing Steps:", updateSteps);

    if (updateSteps) {
      updateSteps.steps = updatedSteps;
      await updateSteps.save();

      console.log("Updated Document:", updateSteps);

      return new Response(`Steps updated successfully`, {
        status: 201,
      });
    } else {
      return new Response("Step type not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to modify the steps", { status: 500 });
  }
};
