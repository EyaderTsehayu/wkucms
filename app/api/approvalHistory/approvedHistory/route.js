
import { connectToDB } from "@/utils/database";
import History from "@/models/history";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/user";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    const userId=session?.user?.userId;
      
    // first fetch previlege from user table for mapping
    const fetchStudent = await User.find({ userId: userId });
    const previlege = fetchStudent[0].privilege;
    
    //  console.log("session from studentApproval ",session?.user?.privilege)
    try {
  
      await connectToDB();
      let requests;
     if((previlege == "Human Resource Management Directorate")){
         requests = await History.find({role:"STAFF"}).sort({ dateApproved: -1 });
     }else{
         requests = await History.find({role:"STUDENT"}).sort({ dateApproved: -1 });
     }
  
  
      // Return a success response with the users data
      return new Response(JSON.stringify(requests), { status: 200 });
    } catch (error) {
      console.error("Error fetching requests:", error);
  
      // Return an error response
      return new Response("Failed to fetch requests", { status: 500 });
    }
  };
  