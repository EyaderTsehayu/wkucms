"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React from "react";
import { useState } from "react";
import RegisterStaff from "@/components/Modals/RegisterStaff";
import { useEffect } from "react";
import useSWR from 'swr';
const columns = [
  { field: "userId", headerName: "ID", width: "100" },
  { field: "firstname", headerName: "First name", width: "240" },
  { field: "middlename", headerName: "Middle name", width: "240" },
  { field: "lastname", headerName: "Last name", width: "240" },
  { field: "role", headerName: "Role", width: "240" },
];

const rows=[];
// const rows = [
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

// const ManageStaff = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from your API
//         const response = await fetch('http://localhost:3000/api/user/new/staff'); // Update with your actual API endpoint
//         const data = await response.json();
//         const updatedData = data.map(user => ({ ...user, id: user._id }));
//         // Update state with the fetched data
//         setUserData(updatedData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch data');
//         setLoading(false);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchData();
//   }, []); // The empty dependency array ensures that useEffect runs only once, similar to componentDidMount

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }



//   const filteredInfo = userData.filter((info) =>
//     info.firstname.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   //const filteredInfo = rows.filter(info => info.id.includes(searchTerm));

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map(user => ({ ...user, id: user._id, roleId: user._id })); // Add id and roleId based on _id
  return updatedData;
};
const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use SWR to fetch and cache data
  const { data: userData, error } = useSWR('http://localhost:3000/api/user/new/staff', fetcher, {
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
          modal={RegisterStaff}
        />
      </div>
    </>
  );
};

export default ManageStaff;
