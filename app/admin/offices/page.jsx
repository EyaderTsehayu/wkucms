"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React from "react";
import { useState, useEffect } from "react";
import RegisterOffice from "@/components/Modals/RegisterOffice";
import useSWR from 'swr';

const columns = [
  { field: "officeId", headerName: "officeId", width: "100" },
  { field: "officeName", headerName: "officeName", width: "240" },
  { field: "location", headerName: "location", width: "240" },
  { field: "items", headerName: "Items", width: "240" },
];

const row = [
  {
    officeId: "100",
    officeName: "eyob",
    location: "dejen",
    items: "qwer",
  },
  {
    officeId: "101",
    officeName: "eyob",
    location: "dejen",
    items: "qwer",
  },
  {
    officeId: "102",
    officeName: "eyob",
    location: "dejen",
    items: "qwer",
  },
];

const ManageOffices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [tryy, settry] = useState([]);

  // useEffect(() => {
  //   const fetchOffices = async () => {
  //     const response = await fetch(`/api/office`);
  //     const data = await response.json();
  //     const updatedData = data.map((user) => ({
  //       ...user,
  //       id: user._id,
  //     }));
  //     console.log("data", updatedData);
  //     settry(updatedData);
  //   }
  //   fetchOffices();
  // }, [tryy])

  // Use useSWR to fetch data
  const { data: officeData, error } = useSWR(
    'http://localhost:3000/api/office',
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data.map(office => ({ ...office, id: office._id }));
    },
    {
      initialData: row, // Provide initial data (can be an empty array)
      revalidateOnFocus: false,
       refreshInterval: 2000,
    }
  );

  // Handle loading state
  if (!officeData) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    console.error('Error fetching data:', error);
    return <p>Failed to fetch data</p>;
  }

  const getRowId = (row) => row.officeId;

  const filteredInfo = officeData.filter((info) =>
    info.officeName.toLowerCase().includes(searchTerm.toLowerCase())
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
          getRowId={getRowId}
          columns={columns}
          rows={filteredInfo}
          modal={RegisterOffice}
        />
      </div>
    </>
  );
};

export default ManageOffices;
