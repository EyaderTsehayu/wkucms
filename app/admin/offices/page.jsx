"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React from "react";
import { useState } from "react";
import RegisterOffice from "@/components/Modals/RegisterOffice";
import { useEffect } from "react";



const columns = [
  { field: "officeId", headerName: "officeId", width: "100" },
  { field: "officeName", headerName: "officeName", width: "240" },
  { field: "location", headerName: "location", width: "240" },
  { field: "items", headerName: "Items", width: "240" },
  
];


// const columns = [
//   { field: "officeId", headerName: "officeId", width: "100" },
//   { field: "officeName", headerName: "officeName", width: "240" },
//   { field: "location", headerName: "location", width: "240" },
//   { field: "items", headerName: "Items", width: "240" },
 
// ];

const rows = [
  {
    id:1,
    officeId: 1,
    location: "Jon",
    items: "Seng",
    officeName: "Library",
  },
  {
    id:2,
    officeId: 2,
    
    location: "Cersei",
    items: "Seng",
    officeName: "Cafteria",
  },
  {
    id:3,
    officeId: 3,
   
    location: "Jaime",
    items: "Seng",
    officeName: "dpt Head office",
  },
  {
    id:4,
    officeId: 4,
    location: "Arya",
    items: "Seng",
    officeName: "Collage dean",
  },
  {
    id:5,
    officeId: 5,
    
    location: "Daenerys",
    items: "Seng",
    officeName: "Dormitory",
  },
  {
  id:6,
    officeId: 6,
    
    location: "Drunk",
    items: "Seng",
    officeName: "Sport and Recreational",
  },
  {
    id:7,
    officeId: 7,
   
    location: "Ferrara",
    items: "Seng",
    officeName: "CCI",
  },
  {
    id:8,
    officeId: 8,
    location: "Rossini",
    items: "Seng",
    officeName: "CCI",
  },
 
];

const ManageOffices = () => {
  
  const [searchTerm, setSearchTerm] = useState("");


  const [officeData, setOfficeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastModified, setLastModified] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await fetch('http://localhost:3000/api/office'); // Update with your actual API endpoint
        const data = await response.json();
        const updatedData = data.map(office => ({ ...office, id: office._id }));

        // Compare the last modified timestamp or any other indicator
        if (lastModified !== data.lastModified) {
          // Update state with the fetched data
          setOfficeData(updatedData);
          setLastModified(data.lastModified); // Update the lastModified timestamp
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [lastModified]); // Include lastModified in the dependency array

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  const filteredInfo = officeData.filter((info) =>
    info.officeName.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
        className="w-full sm:hidden pt-4 pb-3 px-3 py-4 mb-7  rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary "
      />

      <div className="grid grid-cols-12 ">
        <AdminContainer
          columns={columns}
          rows={filteredInfo}
          modal={RegisterOffice}
        />
      </div>
    </>
  );
};

export default ManageOffices;
