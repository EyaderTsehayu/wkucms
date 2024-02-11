"use client";
import Filter from "@/components/Admin/Filter";
import UserContainer from "@/components/User/UserContainer/UserContainer";
import { Metadata } from "next";
import RejectionMessageBox from "@/components/Modals/RejectionMessageBox";
import useSWR from "swr";
import { useState } from "react";
// export const metadata = {
//   title: "WKUCMS | Admin",
//   description: "this a clearance management system for Wolkite University",
//   // other metadata
// };

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
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Drunk",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    department: "Seng",
    college: "CCI",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    department: "Seng",
    college: "CCI",
  },
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
  // Use useSWR to fetch data
  const [searchTerm, setSearchTerm] = useState("");

  // Use SWR to fetch and cache data with automatic refresh every 10 seconds
  const { data: userData, error } = useSWR(
    "http://localhost:3000/api/studentApproval",
    fetcher,
    {
      initialData: rows,
      revalidateOnFocus: false,
      refreshInterval: 2000, // Set the refresh interval in milliseconds (e.g., 10000 for 10 seconds)
    }
  );
  console.log("session from approval ad ", userData);
  // Handle loading and fetch errors
  if (!userData && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }

  return (
    <div className="bg-white sm:px-14 dark:bg-black dark:border-black">
      <h1 className="pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">
        Student Approval
      </h1>
      <div className="pt-2 px-4 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">
        <Filter officeData={officeData} collegeData={collegeData} />

        <UserContainer
          columns={columns}
          rows={userData}
          modal={RejectionMessageBox}
        />
      </div>
    </div>
  );
};

export default ApproveStudent;
