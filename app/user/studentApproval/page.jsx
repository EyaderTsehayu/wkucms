"use client";
import Filter from "@/components/Admin/Filter";
import UserContainer from "@/components/User/UserContainer/UserContainer";
import RejectionMessageBox from "@/components/Modals/RejectionMessageBox";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const stages = {
  Head: ["College Dean"],
  "College Dean": [
    "Dormitory",
    "Cafteria",
    "Sport And Recreation",
    "College Book Store",
  ],
  Dormitory: ["Dean Of Student"],
  Cafteria: ["Dean Of Student"],
  "Sport And Recreation": ["Dean Of Student"],
  "College Book Store": ["Library Chief"],
  "Dean Of Student": ["Registrar"],
  "Library Chief": ["Registrar"],
  Registrar: ["APPROVED"],
};

// Replace this with your actual office data
const officeData = [
  { id: 1, name: "Office 1" },
  { id: 2, name: "Office 2" },
  { id: 3, name: "Office 3" },
  // Add more office data here
];
const collegeData = [
  { id: 1, name: "College of Computing and Informatics" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Social sciences and Humanities" },
  { id: 4, name: "College of behavioral science" },

  // Add more office data here
];

const columns = [
  { field: "userId", headerName: "ID", width: "100" },
  { field: "firstname", headerName: "First name", width: "160" },
  { field: "middlename", headerName: "Last name", width: "160" },
  { field: "reason", headerName: "Reason", width: "160" },
  { field: "status", headerName: "Status", width: "160" },
  { field: "attachedFile", headerName: "Attachement", width: "160" },
];

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map((user) => ({
    ...user,
    id: user._id,
    roleId: user._id,
  }));
  return updatedData;
};

const ApproveStudent = () => {
  let steps = {};
  // Use useSWR to fetch data
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const [filteredData, setFilteredData] = useState([]);
  const previlage = session?.user?.privilege;
  //console.log("previlage inside student approval", previlage);
  // Use SWR to fetch and cache data with automatic refresh every 10 seconds
  const { data: userData, error } = useSWR(
    "/api/studentApproval",
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 2000,
    }
  );
  //console.log("data from student request", userData);
  useEffect(() => {
    const fetchSteps = async () => {
      // fetch student steps before filtering
      
      const studentType = "STUDENT";
      // fetch the steps for academic staff
      const url = "/api/steps";
      const fullStaffUrl = `${url}?stepType=${studentType}`;
      const staffResponse = await fetch(fullStaffUrl);
      const staffData = await staffResponse.json();
      staffData.forEach((data, index) => {
        steps[data.name] = data.nextSteps;
      }
      );
     


      if (userData && previlage && previlage !== "Head") {
        const filtered = userData.filter((request) => {
          const approvalRoles = request.approvals.map(
            (approval) => approval.role
          );

          const stageKeys = Object.keys(steps).filter((key) =>
            steps[key].includes(previlage)
          );

          // Check if the request has approvals for all stageKeys
          const hasAllApprovals = stageKeys.every((key) =>
            approvalRoles.includes(key)
          );

          // Check if the previlage is not in the rejections array
          const notRejected = !request.rejections.includes(previlage);

          return hasAllApprovals && notRejected;
        });
        setFilteredData(filtered);
      }
    }
    fetchSteps();
    
  }, [userData, previlage, steps]);
 

  // Handle loading and fetch errors
  if (!userData && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }
  const clickableColumns = [5];
  return (
    <div className="bg-white sm:px-14 dark:bg-black dark:border-black">
      <h1 className="pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">
        Student Approval
      </h1>
      <div className="pt-2 px-4 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">
        <Filter officeData={officeData} collegeData={collegeData} />

        <UserContainer
          columns={columns}
          rows={previlage !== "Head" ? filteredData : userData}
          modal={RejectionMessageBox}
          clickableColumns={clickableColumns}
        />
      </div>
    </div>
  );
};

export default ApproveStudent;
