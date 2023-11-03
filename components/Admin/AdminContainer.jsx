"use client";
import { useState } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "./Table";
import RegisterStudent from "../Modals/RegisterStudent";

const AdminContainer = ({ columns, rows, modal: OpenedModal }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return (
    <div className="col-span-12  rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-9">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex-grow"></div>
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
          <Table columns={columns} rows={rows} />
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
          class="absolute top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 "
        >
          <OpenedModal />
        </div>
      </Modal>
    </div>
  );
};

export default AdminContainer;
