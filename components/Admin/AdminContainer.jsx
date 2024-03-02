"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "./Table";

import EditStaff from "../Modals/EditStaff";

import { usePathname } from "next/navigation";

const AdminContainer = ({ columns, rows, modal: OpenedModal }) => {
  const pathname = usePathname();
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [userId,setUserData]=useState();

  const handleOpen = () => setOpen(true);
 
  const handleEditOpen =() => {

      // setUserId(selectedRowsData[0]._id)
      setEditOpen(true); // Assuming this state update is still needed
    // const len = selectedRowsData.length;
    
    // try {
    //   //const url = `/api/staff?objectId=${selectedRowsData[0]._id}&arrLength=${len}`; // Build GET request URL with parameters
    //   const ur=`/api/user/new/staff/${selectedRowsData[0]._id}`
    //   const response = await fetch(ur);
  
    //   if (response.ok) {
    //     const responseData = await response.text();
    //     let toastShown = false;
  
    //     if (responseData) {
    //       if (selectedRowsData.length > 1) {
    //         toast.success(responseData);
    //         toastShown = true;
    //       } else {
    //         toast.success("Approved Successfully");
    //       }
    //     }
    //   } else {
    //     console.error("Error fetching data:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }

 
  }
  
  useEffect(()=>{
    const fetchStaff=async()=>{
        try {
      //const url = `/api/staff?objectId=${selectedRowsData[0]._id}&arrLength=${len}`; // Build GET request URL with parameters
      const ur=`/api/user/new/staff/${selectedRows[0]._id}`
      const response = await fetch(ur);
  
      if (response.ok) {
        const responseData = await response.text();
        let toastShown = false;
        setUserData(responseData);
        if (responseData) {
          if (selectedRows.length > 1) {
            toast.success(responseData);
            toastShown = true;
          } else {
            toast.success("Approved Successfully");
          }
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

 
    }
    if(selectedRows){
      fetchStaff();
    }
  },[selectedRows])









  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
      handleEditClose();
    }
  };
// console.log("selectedRows",selectedRows[0].privilege);
  // search
  const [searchTerm, setSearchTerm] = useState("");
  // const filteredInfo = rows.filter((info) =>
  //   info.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  //const filteredInfo = rows.filter(info => info.id.includes(searchTerm));
  // if (filteredInfo) {
  //   rows = filteredInfo;
  // }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  ${
        pathname.includes("student") && "col-span-9"
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
          {pathname=="/admin/staff"&&(

          <button
            onClick={handleEditOpen}
            className="rounded-lg  justify-center  bg-primary py-2 px-6 font-medium text-whiten hover:bg-opacity-95"
          >
            Edit
          </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <Table
            columns={columns}
            rows={rows}
            setSelectedRows={setSelectedRows}
          />
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

      {/* modals for edit  */}
      {editOpen &&(
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div
          onClick={handleOverlayClick}
          className="absolute top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-gray/10 dark:bg-black/90 px-4 py-5 "
        >
          <EditStaff userData={selectedRows}/>
        </div>
      </Modal>
        )}
    </div>
  );
};

export default AdminContainer;
