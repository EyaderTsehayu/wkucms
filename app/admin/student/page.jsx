"use client";
import AdminContainer from "@/components/Admin/AdminContainer";
import AdminBreadcrumb from "@/components/Breadcrumb/adminBreadcrumb";
import RegisterStudent from "@/components/Modals/RegisterStudent";
import { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";

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
  { field: "userId", headerName: "ID", width: "120" },
  { field: "firstname", headerName: "First Name", width: "120" },
  { field: "middlename", headerName: "Middle Name", width: "120" },
  { field: "lastname", headerName: "Last Name", width: "120" },
  { field: "collegeName", headerName: "College", width: "220" },
  { field: "departmentName", headerName: "Department", width: "180" },
  { field: "year", headerName: "year", width: "80" },
];

const rows = [];
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map((user) => ({
    ...user,
    id: user._id,
    roleId: user._id,
  })); // Add id and roleId based on _id
  return updatedData;
};

const ManageStudent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use SWR to fetch and cache data
  const { data: userData, error } = useSWR(
    "/api/user/new/student",
    fetcher,
    {
      initialData: rows, // Provide initial data (can be an empty array)
      revalidateOnFocus: false,
      refreshInterval: 2000, // Disable automatic revalidation on focus
    }
  );

  // Handle loading and fetch errors
  if (!userData && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }

  const filteredInfo = userData.filter(
    (info) =>
      info.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      info.roleId.toString().includes(searchTerm) // Include roleId in filtering
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <AdminBreadcrumb
        title="Manage Students"
        mainRoute="Admin"
        subRoute="Student"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">
        <AdminContainer
          columns={columns}
          rows={userData}
          modal={RegisterStudent}
        />
      </div>
    </>
  );
};

export default ManageStudent;
