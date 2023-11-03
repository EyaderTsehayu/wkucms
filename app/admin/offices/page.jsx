"use client"

import AdminContainer from "@/components/Admin/AdminContainer";
import React from "react";
import { useState } from "react";
const columns = [
  { field: "id", headerName: "ID", width: "100" },
  { field: "firstName", headerName: "First name", width: "160" },
  { field: "lastName", headerName: "Last name", width: "160" },
  { field: "officeName", headerName: "Office name", width: "160" },
  { field: "department", headerName: "Department", width: "160" },


];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    department: "Seng",
    officeName: "Library",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    department: "Seng",
    officeName: "Cafteria",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    department: "Seng",
    officeName: "dpt Head office",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    department: "Seng",
    officeName: "Collage dean",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    department: "Seng",
    officeName: "Dormitory",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Drunk",
    department: "Seng",
    officeName: "Sport and Recreational",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    department: "Seng",
    officeName: "CCI",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    department: "Seng",
    officeName: "CCI",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    department: "Seng",
    officeName: "CCI",
  },
];


const ManageOffices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredInfo = rows.filter(info => info.officeName.toLowerCase().includes(searchTerm.toLowerCase()));
  //const filteredInfo = rows.filter(info => info.id.includes(searchTerm));

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
        className="sm:w-1/3 w-full pt-4 pb-3 px-3 py-4 mb-7  focus:outline-none  shadow-stroke rounded-lg border border-stroke  shadow-lg  dark:border-strokedark dark:bg-boxdark dark:shadow-none "
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">

        <AdminContainer columns={columns} rows={filteredInfo} />
      </div>
    </>
  );
};

export default ManageOffices;
