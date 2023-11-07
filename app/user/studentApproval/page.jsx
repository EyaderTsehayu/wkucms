"use client";
import Filter from "@/components/Admin/Filter";
import AdminContainer from "@/components/Admin/AdminContainer";
import { Metadata } from "next";
import RegisterStudent from "@/components/Modals/RegisterStudent";
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
    { field: "id", headerName: "ID", width: "100" },
    { field: "firstName", headerName: "First name", width: "160" },
    { field: "lastName", headerName: "Last name", width: "160" },
    { field: "college", headerName: "College", width: "160" },
    { field: "department", headerName: "Department", width: "160" },
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

const ApproveStudent = () => {
    return (
        <div className="bg-white sm:px-14 dark:bg-black dark:border-black">
            <h1 className="pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">Student Approval</h1>
            <div className="pt-2 px-4 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">
                <Filter officeData={officeData} collegeData={collegeData} />

                <AdminContainer columns={columns} rows={rows} modal={RegisterStudent} />
            </div>
        </div>
    );
};

export default ApproveStudent;
