"use client";
import Filter from "@/components/Admin/Filter";
import AdminContainer from "@/components/Admin/AdminContainer";
import { Metadata } from "next";
import RegisterStudent from "@/components/Modals/RegisterStudent";
import { useState } from "react";
import { useEffect } from "react";
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

// const columns = [
//   { field: "id", headerName: "ID", width: "100" },
//   { field: "firstName", headerName: "First name", width: "160" },
//   { field: "lastName", headerName: "Last name", width: "160" },
//   { field: "college", headerName: "College", width: "160" },
//   { field: "department", headerName: "Department", width: "160" },
// ];


const columns = [
  { field: "userId", headerName: "ID", width: "100" },
  { field: "firstname", headerName: "First name", width: "160" },
  { field: "middlename", headerName: "middle name", width: "160" },
  { field: "lastname", headerName: "Last name", width: "160" },
  { field: "collegeId", headerName: "College", width: "160" },
  { field: "departmentId", headerName: "Department", width: "160" },
  { field: "year", headerName: "year", width: "160" },
  { field: "role", headerName: "Role", width: "160" },
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




const ManageStudent = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await fetch('http://localhost:3000/api/user/new/student'); // Update with your actual API endpoint
        const data = await response.json();
        const updatedData = data.map(user => ({ ...user, id: user._id }));
        // Update state with the fetched data
        setUserData(updatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once, similar to componentDidMount
  
  if (loading) {
    <p>Loading...</p>;
  }
  
  if (error) {
   <p>{error}</p>;
  }


  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-4.5">
        <Filter officeData={officeData} collegeData={collegeData} />

        <AdminContainer columns={columns} rows={userData} modal={RegisterStudent} />
      </div>
    </>
  );
};

export default ManageStudent;
