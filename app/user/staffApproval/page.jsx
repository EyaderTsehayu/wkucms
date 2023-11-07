"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React from "react";
import { useState } from "react";
import RegisterStaff from "@/components/Modals/RegisterStaff";

const columns = [
    { field: "id", headerName: "ID", width: "100" },
    { field: "firstName", headerName: "First name", width: "240" },
    { field: "lastName", headerName: "Last name", width: "240" },
    { field: "officeName", headerName: "Office name", width: "240" },
    { field: "department", headerName: "Department", width: "240" },
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

const ApproveStaff = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredInfo = rows.filter((info) =>
        info.officeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //const filteredInfo = rows.filter(info => info.id.includes(searchTerm));

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="bg-white sm:px-14 dark:bg-black dark:border-black">
            <h1 className="pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">Staff Approval</h1>
            <div className="pt-2 px-4  ">
                <input
                    type="text"
                    placeholder="Search office requirement here"
                    value={searchTerm}
                    onChange={handleSearch}
                    className=" w-full sm:hidden pt-4 pb-3 px-3 py-4 mb-7  rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary "
                />

                <div className=" grid grid-cols-12 ">
                    <AdminContainer
                        columns={columns}
                        rows={filteredInfo}
                        modal={RegisterStaff}
                    />
                </div>
            </div>
        </div>
    );
};

export default ApproveStaff;
