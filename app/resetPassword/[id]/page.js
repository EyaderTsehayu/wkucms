"use client";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { changePasswordSchema } from "../validations/userValidation";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import { getSession, useSession } from "next-auth/react";


import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Verify from "@/components/auth/Verify";


const ChangePassword = () => {
  const [userData, setUserData] = useState([]);

  // const session = useSession();
  // const Id = session?.user?.id;
  // const userId = session?.user?.userId;
 
  const pathname = usePathname();
  const parts = pathname.split("/");
  const userId = parts[parts.length - 1];

  

  

  useEffect(() => {
    // console.log("oooooo",userId);
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/byUserId/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        setUserData(fetchedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, userData]);




 

  return (
   <Verify userData={userData}/>
  );
};

export default ChangePassword;
