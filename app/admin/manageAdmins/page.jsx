"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React from "react";
import { useState } from "react";
import RegisterAdmin from "@/components/Modals/RegisterAdmins";
import { useEffect } from "react";
import useSWR from 'swr';


const columns=[
  { field: "userIusersd", headerName: "ID", width: "100" },
  { field: "firstname", headerName: "First name", width: "240" },
  { field: "middlename", headerName: "Middle name", width: "240" },
  { field: "lastname", headerName: "Last name", width: "240" },
  { field: "role", headerName: "Role", width: "240" },
];

//  const rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     department: "Seng",
//     officeName: "Library",
//   },
//   {
//     id: 2,
//     lastName: "Lannister",
//     firstName: "Cersei",
//     department: "Seng",
//     officeName: "Cafteria",
//   },
//   {
//     id: 3,
//     lastName: "Lannister",
//     firstName: "Jaime",
//     department: "Seng",
//     officeName: "dpt Head office",
//   },
//   {
//     id: 4,
//     lastName: "Stark",
//     firstName: "Arya",
//     department: "Seng",
//     officeName: "Collage dean",
//   },
//   {
//     id: 5,
//     lastName: "Targaryen",
//     firstName: "Daenerys",
//     department: "Seng",
//     officeName: "Dormitory",
//   },
//   {
//     id: 6,
//     lastName: "Melisandre",
//     firstName: "Drunk",
//     department: "Seng",
//     officeName: "Sport and Recreational",
//   },
//   {
//     id: 7,
//     lastName: "Clifford",
//     firstName: "Ferrara",
//     department: "Seng",
//     officeName: "CCI",
//   },
//   {
//     id: 8,
//     lastName: "Frances",
//     firstName: "Rossini",
//     department: "Seng",
//     officeName: "CCI",
//   },
//   {
//     id: 9,
//     lastName: "Roxie",
//     firstName: "Harvey",
//     department: "Seng",
//     officeName: "CCI",
//   },
// ];

const rows=[];

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map(user => ({ ...user, id: user._id, roleId: user._id })); // Add id and roleId based on _id
  return updatedData;
};

const ManageAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use SWR to fetch and cache data
  const { data: userData, error } = useSWR('http://localhost:3000/api/user/new/admin', fetcher, {
    initialData: rows, // Provide initial data (can be an empty array)
    revalidateOnFocus: false, // Disable automatic revalidation on focus
  });

  // Handle loading and fetch errors
  if (!userData && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Failed to fetch data</p>;
  }

  const filteredInfo = userData.filter((info) =>
    info.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    info.roleId.toString().includes(searchTerm) // Include roleId in filtering
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  return (
    <>
      <input
        type="text"
        placeholder="Search office requirement here"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full sm:hidden pt-4 pb-3 px-3 py-4 mb-7  rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary "
      />

      <div className="grid grid-cols-12 ">
        <AdminContainer
          columns={columns}
          rows={filteredInfo}
          modal={RegisterAdmin}
          
        />
      </div>
    </>
  );
};

export default ManageAdmin;