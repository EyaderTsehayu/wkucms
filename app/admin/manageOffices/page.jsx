"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React, { useState, useEffect, useRef } from "react";

import RegisterOffice from "@/components/Modals/RegisterOffice";
import useSWR from 'swr';
import { usePathname } from "next/navigation";
import Modal from "@mui/material/Modal";



const PersonItem = ({ person }) => (
  <div className="relative flex space-x-3 border rounded p-2 bg-gray-100">
    <p>{person}</p>
  </div>
);





const ManageOffices = ({ modal: OpenedModal }) => {

  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // fetch the steps from db
  const [stepData, setStepData] = useState(null);
  const [stepError, setStepError] = useState(null);
  const [updateSteps, setUpdateSteps] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/step");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const updatedData = data.map((user) => ({
          ...user,
          id: user._id,
        }));
        setStepData(updatedData);
      } catch (error) {
        setStepError(error); // Corrected from `error` to `stepError`
      }
    };


    fetchData(); // Fetch data once when component mounts

    // No cleanup or dependency array needed as we only want to fetch data once
  }, []);

  if (stepData) {

    console.log("stepData ", stepData[0].steps)
  }

  // Render loading state
  if (!stepData && !stepError) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (stepError) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }





  function handleSort() {
    const peopleClone = [...stepData[0].steps];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    updatePeople(peopleClone);
    setUpdateSteps(peopleClone);
  }



  // modify the steps
  const modifySteps = async () => {
    console.log("updateStepsss", updateSteps);
    try {
      const response = await fetch(`/api/step/steps`, {
        method: "PATCH",
        body: JSON.stringify({
          stepType: "STAFF",
          updatedSteps: updateSteps,
        }),
      });
  
      if (!response.ok) {
        // Check if response status is not in the range 200-299 (successful)
        throw new Error('Failed to fetch data. Server returned ' + response.status);
      }
  
      // Optionally, you can handle the response here if needed
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately, perhaps by displaying an error message to the user
    }
  };
  

  const pathname = usePathname();
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div
      className={`rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  ${pathname.includes("student") && "col-span-9"
        } col-span-12 xs:col-span-9 `}
    >
      <div className="flex-grow"></div>
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex w-1/3 ">
          <input
            type="text"
            placeholder="Search here ..."
            value={searchTerm}
            onChange={handleSearch}
            className=" w-full hidden sm:block px-4 py-2 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex gap-4 flex-inline  items-center rounded-md  p-1.5 ">
          <button className="rounded-lg  justify-center  bg-gray hover:bg-meta-1 py-2 px-6 font-medium text-black dark:bg-meta-4 dark:text-white hover:text-whiten hover:bg-opacity-95 dark:hover:border-meta-1 dark:hover:bg-meta-1">
            Deactivate
          </button>
          <button
            onClick={handleOpen}
            className="rounded-lg  justify-center  bg-primary py-2 px-6 font-medium text-whiten hover:bg-opacity-95"
          >
            Register
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">


          <main className="flex min-h-screen flex-col items-center space-y-4">
            <h1 className="text-xl font-bold mt-4">List</h1>
            {stepData[0].steps.map((person, index) => (
              <div key={index}
                draggable
                onDragStart={() => (dragPerson.current = index)}
                onDragEnter={() => (draggedOverPerson.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <PersonItem key={index} person={person} />
              </div>
            ))}
            <div className="w-full px-3 2xsm:w-1/2">
              <button
                onClick={modifySteps}
                className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
              >
                Save
              </button>
            </div>
          </main>



        </div>

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          onClick={handleOverlayClick}
          className="absolute top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-gray/10 dark:bg-black/90 px-4 py-5 "
        >
          <OpenedModal />
        </div>
      </Modal>

    </div>
  );
};

export default ManageOffices;
