"use client";
import Filter from "@/components/Admin/Filter";
import UserContainer from "@/components/User/UserContainer/UserContainer";
import RejectionMessageBox from "@/components/Modals/RejectionMessageBox";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Breadcrumb from "@/components/Breadcrumb/breadcrumb";
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

const columns = [
  { field: "userId", headerName: "ID", width: "120" },
  { field: "firstname", headerName: "First Name", width: "140" },
  { field: "middlename", headerName: "Last Name", width: "140" },
  { field: "departmentName", headerName: "Department", width: "200" },
  { field: "collegeName", headerName: "College", width: "200" },
  { field: "reason", headerName: "Reason", width: "160" },
  { field: "attachedFile", headerName: "Attachment", width: "100" },
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
  const clickableColumns = [6];
  return (
    <div className="bg-white sm:px-6 px-2 dark:bg-black dark:border-black">
      <Breadcrumb
        title="Student Approval"
        mainRoute="User"
        subRoute="Student Approval"
      />
      <div className="pt-2 px-4 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">
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
