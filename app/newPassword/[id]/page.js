"use client"
import React from 'react'

import NewPassword from "@/components/auth/NewPassword";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
const page = () => {
  const [userData, setUserData] = useState([]);
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
    <div>
        <NewPassword userData={userData}/>
    </div>
  )
}

export default page