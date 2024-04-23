// "use client";

// import AdminContainer from "@/components/Admin/AdminContainer";
// import React, { useState, useEffect, useRef } from "react";

// import RegisterOffice from "@/components/Modals/RegisterOffice";
// import useSWR from 'swr';
// import { usePathname } from "next/navigation";
// import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
// import SwapVertIcon from '@mui/icons-material/SwapVert';

// import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
// import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';



// const ManageStaffOffices = () => {

//   const dragPerson = useRef(0);
//   const draggedOverPerson = useRef(0);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   // fetch the steps from db
//   const [stepData, setStepData] = useState(null);
//   const [stepError, setStepError] = useState(null);
//   const [updateSteps, setUpdateSteps] = useState();
//   const [draggedData, setDraggedData] = useState();


//   // const PersonItem = ({ person,index }) => (
//   //   <>
//   //    {person!="APPROVED"&&(
//   //   <div className="relative w-60 flex space-x-3 border rounded p-2 bg-gray-100">
//   //   <SwapVertIcon onClick={()=>console.log(`${index}`)}/>
//   //   <p onClick={()=>console.log(`${index}`)}>{index}{ }</p>
//   //     <p>{person}</p>
//   //     </div>
//   //     )}
//   //   </>
//   // );
//   const PersonItem = ({ person, index, draggedData, setDraggedData }) => {
//     const SwapDecreamentally = () => {


//       if ((index < draggedData.length - 1) && (index != 0)) {

//         const updatedData = [...draggedData];
//         // Swap the items
//         const temp = updatedData[index];
//         updatedData[index] = updatedData[index - 1];
//         updatedData[index - 1] = temp;
//         // Update the state
//         setDraggedData(updatedData);
//         console.log("wwww", updatedData)
//         setUpdateSteps(updatedData);
//       } else if (index == 0) {
//         const updatedData = [...draggedData];
//         // Swap the items
//         const temp = updatedData[index];
//         updatedData[index] = updatedData[draggedData.length - 2];
//         updatedData[draggedData.length - 2] = temp;
//         // Update the state
//         setDraggedData(updatedData);

//         setUpdateSteps(updatedData);
//       }
//     };

//     const SwapIncreamentally = () => {


//       if (index < draggedData.length - 2) {

//         const updatedData = [...draggedData];
//         // Swap the items
//         const temp = updatedData[index];
//         updatedData[index] = updatedData[index + 1];
//         updatedData[index + 1] = temp;
//         // Update the state
//         setDraggedData(updatedData);
//         console.log("wwww", updatedData)
//         setUpdateSteps(updatedData);
//       } else if (index == draggedData.length - 2) {
//         const updatedData = [...draggedData];
//         // Swap the items
//         const temp = updatedData[index];
//         updatedData[index] = updatedData[0];
//         updatedData[0] = temp;
//         // Update the state
//         setDraggedData(updatedData);

//         setUpdateSteps(updatedData);
//       }
//     };


//     return (
//       <>
//         {person !== "APPROVED" && (
//           <div className="relative w-60 flex space-x-3 border rounded p-2 bg-gray-100">
//             <KeyboardDoubleArrowUpIcon onClick={SwapDecreamentally} />

//             <p onClick={() => console.log(`${index + 1}`)}>{index + 1}</p>
//             <p>{person}</p>
//             <div class="flex flex-1 justify-end">
//               <KeyboardDoubleArrowDownIcon onClick={SwapIncreamentally} />
//             </div>
//           </div>
//         )}
//       </>
//     );
//   };


//   useEffect(() => {
//     // const fetchData = async () => {
//     //   try {
//     //     const response = await fetch("http://localhost:3000/api/step");
//     //     if (!response.ok) {
//     //       throw new Error('Network response was not ok');
//     //     }
//     //     const data = await response.json();
//     //     const updatedData = data.map((user) => ({
//     //       ...user,
//     //       id: user._id,
//     //     }));
//     //     setStepData(updatedData);
//     //     setDraggedData(updatedData[0].steps);
//     //     console.log("setDraggedData",draggedData);

//     //   } catch (error) {
//     //     setStepError(error); // Corrected from `error` to `stepError`
//     //   }
//     // };

//     const fetchData = async () => {
//       try {
//         const stepType = "STAFF"; // Define your stepType here
//         const url = new URL("http://localhost:3000/api/step");
//         url.searchParams.append("stepType", stepType);

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const updatedData = data.map((user) => ({
//           ...user,
//           id: user._id,
//         }));
//         setStepData(updatedData);
//         setDraggedData(updatedData[0].steps);
//         console.log("setDraggedData", draggedData);
//       } catch (error) {
//         setStepError(error);
//       }
//     };


//     fetchData(); // Fetch data once when component mounts

//     // No cleanup or dependency array needed as we only want to fetch data once
//   }, []);

//   if (stepData) {

//     console.log("stepData ", stepData)
//   }

//   // Render loading state
//   if (!stepData && !stepError) {
//     return <p>Loading...</p>;
//   }

//   // Render error state
//   if (stepError) {
//     console.error("Error fetching data:", stepError);
//     return <p>Failed to fetch data</p>;
//   }





//   function handleSort() {
//     const peopleClone = [...stepData[0].steps];
//     const temp = peopleClone[dragPerson.current];
//     peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
//     peopleClone[draggedOverPerson.current] = temp;
//     console.log("peopleClone", peopleClone)
//     setDraggedData(peopleClone);
//     console.log("setDraggedData", draggedData);
//     setUpdateSteps(peopleClone);
//   }



//   // modify the steps
//   const modifySteps = async () => {
//     console.log("updateStepsss", updateSteps);
//     try {
//       const response = await fetch(`/api/step`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           stepType: "STAFF",
//           updatedSteps: updateSteps,
//         }),
//       });

//       if (!response.ok) {
//         // Check if response status is not in the range 200-299 (successful)
//         throw new Error('Failed to fetch data. Server returned ' + response.status);
//       }
//       toast.success("update Successful!");
//       // Optionally, you can handle the response here if needed
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error appropriately, perhaps by displaying an error message to the user
//     }
//   };


//   const pathname = usePathname();
//   // const [selectedRows, setSelectedRows] = useState([]);
//   // const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       handleClose();
//     }
//   };



//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };


//   return (
//     <div
//       className={`rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  ${pathname.includes("student") && "col-span-9"
//         } col-span-12 xs:col-span-9 `}
//     >
//       <div className="flex-grow"></div>
//       <div className="flex w-full justify-between items-center mb-4">
//         <div className="flex w-1/3 ">
//           {/* <input
//               type="text"
//               placeholder="Search here ..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className=" w-full hidden sm:block px-4 py-2 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//             /> */}
//         </div>

//         <div className="flex gap-4 flex-inline  items-center rounded-md  p-1.5 ">
//           {/* <button className="rounded-lg  justify-center  bg-gray hover:bg-meta-1 py-2 px-6 font-medium text-black dark:bg-meta-4 dark:text-white hover:text-whiten hover:bg-opacity-95 dark:hover:border-meta-1 dark:hover:bg-meta-1">
//             Deactivate
//           </button> */}
//           <button
//             onClick={handleOpen}
//             className="rounded-lg  justify-center  bg-primary py-2 px-6 font-medium text-whiten hover:bg-opacity-95"
//           >
//             Register
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
//         <div className="flex w-full flex-wrap gap-3 sm:gap-5">


//           <main className="flex min-h-screen flex-col items-center space-y-4">
//             {/* <h1 className="text-xl font-bold mt-4">List</h1> */}
//             {/* {stepData[0]?.steps?.map((person, index) => ( */}
//             {draggedData.map((person, index) => (
//               <div key={index}
//                 draggable
//                 onDragStart={() => (dragPerson.current = index)}
//                 onDragEnter={() => (draggedOverPerson.current = index)}
//                 onDragEnd={handleSort}
//                 onDragOver={(e) => e.preventDefault()}
//               >
//                 {/* <h>{index+1}</h> */}
//                 <PersonItem index={index}
//                   person={person}
//                   draggedData={draggedData}
//                   setDraggedData={setDraggedData} />
//               </div>
//             ))}

//             {/* 2xsm:w-1/2 */}
//             <div className=" w-full px-1 ">
//               <button
//                 onClick={modifySteps}
//                 className="block  w-full rounded border border-primary bg-primary py-2 text-center font-medium text-white transition hover:bg-opacity-90"
//               >
//                 Save
//               </button>
//             </div>
//           </main>



//         </div>

//       </div>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <div
//           onClick={handleOverlayClick}
//           className="absolute top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-gray/10 dark:bg-black/90 px-4 py-5 "
//         >
//           <RegisterOffice />
//         </div>
//       </Modal>

//     </div>
//   );
// };

// export default ManageStaffOffices;


"use client";

import AdminContainer from "@/components/Admin/AdminContainer";
import React, { useState, useEffect, useRef } from "react";

import RegisterOffice from "@/components/Modals/RegisterOffice";
import useSWR from 'swr';
import { usePathname } from "next/navigation";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import AddIcon from '@mui/icons-material/Add';

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const PersonItem = ({person,index }) => (
//   <>
//    {person!="APPROVED"&&(
//   <div className="relative w-60 flex space-x-3 border rounded p-2 bg-gray-100">
//      {/* <MaterialCommunityIcons name="menu-swap-outline" size={24} color="black" />~ */}
//     <SwapVertIcon/>
//     <p>{index}</p>
//     <p>{person}</p>
//     </div>
//     )}
//   </>
// );



const ManageStudentOffices = () => {
  const [keyValuePairs, setKeyValuePairs] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const [steps, setSteps] = useState({
    Head: ["College Dean"],
    "College Dean": [
      "Dormitory",
      "Cafteria",
      "Sport And Recreation",
      "College Book Store",
    ],
    Dormitory: ["Dean Of Student"],
    Cafteria: ["Dean Of Student"],
    "Sport And Recreation": ["Dean Of Student"],
    "College Book Store": ["Library Chief"],
    "Dean Of Student": ["Registrar"],
    "Library Chief": ["Registrar"],
    Registrar: ["APPROVED"],
  });
  // const [steps, setSteps] = useState({});
  const [selectedKey, setSelectedKey] = useState(null); // State for selected key
  //  setSteps({"yes":["College Dean"]})
  const [stepData, setStepData] = useState();
  const [stepError, setStepError] = useState(null)
  console.log("ooooo", steps);
  useEffect(() => {
    console.log("ooooo");
    const fetchData = async () => {
      try {
        const stepType = "STAFF"; // Define your stepType here
        const url = new URL("http://localhost:3000/api/steps");
        url.searchParams.append("stepType", stepType);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const updatedData = data.map((user) => ({
          ...user,
          id: user._id,
        }));
        setStepData(data);

        console.log("setDraggedData", data);
      } catch (error) {
        setStepError(error);
      }
    };


    fetchData(); // Fetch data once when component mounts

    // No cleanup or dependency array needed as we only want to fetch data once
  }, []);

  if (stepData) {

    console.log("stepData ", stepData[0])
  }

  // Render loading state
  if (!stepData && !stepError) {
    return <p>Loading...</p>;
  }

 




  const list = [];
  console.log("stepData[0].name", stepData[0].name);
  // for (let index = 0; index < stepData[0].length; index++) {
  //     const key =stepData[0].name;
  //     list.push(key);
  // }
  //     stepData[0].name.forEach(element => {
  //         list.push(element);

  //    });
  const data = stepData[0];
  // console.log("data",data);
  for (let index = 0; index < stepData.length; index++) {

    Object.keys(data).forEach(key => {
      // console.log("key",key);
      if (key === 'name') {
        list.push(data[key]);
      }
    });
  }
  const values = stepData[0].nextSteps;

  const handleCloseModal = () => {
    setOpen(false); // Close the modal
  };

  // const keys = Object.keys(steps);
  // const values = Object.values(steps);
  console.log("list", list);
  const modifySteps = async (key, value) => {
    setSteps(prevSteps => ({
      ...prevSteps,
      newProperty: ["New Value"],
      // You can add more properties here if needed
    }));
    // donot delete the commit
    // try {
    //     const response = await fetch("/api/steps", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             steps,
    //             stepType: "STUDENT"
    //         }),
    //     });
    //     if (response.ok) {
    //         console.log("Steps created successfully!");
    //         // Optionally, you can redirect or show a success message here
    //     } else {
    //         console.error("Failed to create steps");
    //         // Handle the error, maybe show an error message to the user
    //     }
    // } catch (error) {
    //     console.error("Error creating steps:", error);
    //     // Handle any unexpected errors
    // }




    try {
      const response = await fetch("/api/steps", {
        method: "PATCH",
        body: JSON.stringify({
          key,
          value,
          stepType: "STAFF"
        }),
      });
      if (response.ok) {
        toast.success("Steps updated successfully!")
        console.log("Steps updated successfully!");
        console.log("keyValuePairs", keyValuePairs);
        // Optionally, you can redirect or show a success message here
      } else {
        console.error("Failed to create steps");
        // Handle the error, maybe show an error message to the user
      }
    } catch (error) {
      console.error("Error creating steps:", error);
      // Handle any unexpected errors
    }

  }

  // const keyValuePairs = {};
  stepData.forEach((data, index) => {
    keyValuePairs[data.name] = data.nextSteps;
  });

  const addItem = (key, value) => {
    keyValuePairs[key].push(value)
    // console.log("ttttttttttttttttttttt","yyy",value);
    if (key !== value && key !== "Select a Step") {
      setKeyValuePairs(prevKeyValuePairs => {
        const updatedPairs = { ...prevKeyValuePairs };
        updatedPairs[key] = [...(updatedPairs[key] || []), value];
        return updatedPairs;
      });
    }
    // console.log("ttttttttttttttttttttt","yyy",keyValuePairs);
  };


  const removeItem = (key, value) => {
    keyValuePairs[key].pop(value);
    setSteps((prevSteps) => ({
      ...prevSteps,
      [key]: prevSteps[key].filter((item) => item !== value),
    }));
  };


  console.log("steps", steps);



  // Iterate over the key-value pairs of the object
  Object.entries(keyValuePairs).forEach(([key, value]) => {
    console.log("Key:", key);
    console.log("Value:", value);
  });
  const keys = Object.keys(keyValuePairs);
  const value = Object.values(keyValuePairs);

  const Approved = {
    key: "APPROVED",
    name: "APPROVED",
    nextSteps: []
  }
  return (
    <div
      className={`rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  
        } col-span-12 xs:col-span-9 `}
    >
      <div className="flex-grow"></div>
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex w-1/3 ">

        </div>

        <div className="flex gap-4 flex-inline  items-center rounded-md  p-1.5 ">
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


            <select class="ml-1 mr-15  bg-primary text-white  inline-flex items-center gap-2.5 rounded-md dark:bg-boxdark px-5.5 py-3 font-medium  dark:border-strokedark dark:text-white" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>

              <option value={null}>Select a Step</option>
              {stepData.map((data, key) => (
                <option key={key} value={data.name}>
                  {data.name}

                </option>
              ))}
            </select>
            <div className="flex flex-col gap-15 md:flex-row">

              {/* && !stepData[selectedKey]?.includes(value.name )  */}

              {/* List of available values to add (Right Box - Minus) */}
              <div className="mt-5">
                <ul className="pl-5 py-3  ">
                  {Object.entries(keyValuePairs).map(([key, value]) => (
                    (key !== selectedKey && !keyValuePairs[selectedKey]?.includes(key)) && (
                      <div key={key}>

                        <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3">
                          <div className="justify-center">{key}</div>
                          <button className="flex flex-1 justify-end" onClick={() => addItem(selectedKey, key)}>
                            {/* <ArrowCircleRightIcon /> */}
                            <AddIcon />
                          </button>
                        </li>



                      </div>
                    )
                  ))}
                  {selectedKey?.toUpperCase() === "HR" && !keyValuePairs[selectedKey]?.includes(Approved.name) && (
                    <div key={Approved.name}>

                      <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3">
                        <div className="justify-center">{Approved.name}</div>
                        <button className="flex flex-1 justify-end" onClick={() => addItem(selectedKey, Approved.name)}>
                          {/* <ArrowCircleRightIcon /> */}
                          <AddIcon />
                        </button>
                      </li>



                    </div>
                  )}
                </ul>
              </div>
              {/* rounded-md border border-stroke bg-white shadow-default dark:border-black dark:bg-black */}
              {/* remover */}
              <div className="mt-5 " >
                <ul className="pl-5 py-3">
                  {keyValuePairs[selectedKey]?.map((value) => (
                    <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3" key={value}>

                      <button className="flex flex-1 justify-start" onClick={() => removeItem(selectedKey, value)}>
                        {/* <ArrowCircleLeftIcon /> */}
                        <HorizontalRuleIcon />
                      </button>
                      <div className="justify-center">{value}</div>

                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className=" w-full px-1 ">
              <button

                onClick={() => modifySteps(selectedKey, keyValuePairs[selectedKey])}
                className="ml-5 block w-60 rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
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
          <RegisterOffice handleCloseModal={handleCloseModal} />
        </div>
      </Modal>

    </div>
  );
};

export default ManageStudentOffices;


