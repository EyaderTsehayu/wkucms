import { useEffect, useState } from "react";
import useSWR from "swr";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { toast } from "react-toastify";
import { object } from "prop-types";

const steps = {
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
};

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map((user) => ({
    ...user,
    id: user._id,
    roleId: user._id,
  }));
  return updatedData;
};

const Status = () => {
  const { data: userData, error } = useSWR(
    "http://localhost:3000/api/userStatus",
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 2000,
    }
  );

  const [requestStatus, setRequestStatus] = useState([]);

  useEffect(() => {
    if (userData) {
      const dataDisplay = [];
      const currentStatus = userData[0]?.status;
      Object.keys(steps).forEach((key) => {
        const stepKey = key;
        const approvals = userData[0]?.approvals.map(
          (approval) => approval.role
        );
        const rejections = userData[0]?.rejections;

        let status = "Not Started";

        if (approvals && approvals.includes(key)) {
          status = "Approved";
        } else if (rejections && rejections.includes(key)) {
          status = "Rejected";
        } else if (currentStatus && currentStatus.includes(key)) {
          for (const element of currentStatus) {
            if (steps[element] && steps[element].includes(stepKey)) {
              status = "Not Started";
            }
          }
          status = "Pending";
        }

        dataDisplay.push({ name: key, status: status });
      });

      setRequestStatus(dataDisplay);
    }
  }, [userData]);

  const handleReinitate = async (key) => {
    // alert(requestStatus[key].name);
    const response = await fetch(`/api/reinitiateRejected`, {
      method: "PATCH",
      body: JSON.stringify({
        reinitiate: requestStatus[key].name,
        objectId: userData[0]._id,
      }),
    });
    if (response.ok) {
      toast.success("Your clearance is reinitiated successfully");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col ">
        <div className="grid  rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-2">
          <div className="p-2.5 sm:ml-16  text-center xl:p-3">
            <h5 className="text-sm text-black-2 dark:text-whiter font-medium  xsm:text-xl">
              Offices
            </h5>
          </div>
          <div className="p-2.5 sm:ml-16  text-left xl:p-3">
            <h5 className="text-sm text-black-2  dark:text-whiter font-medium  xsm:text-xl">
              Status
            </h5>
          </div>
        </div>

        {requestStatus.map((request, key) => (
          <div
            className={`grid grid-cols-2  ${
              key === requestStatus.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center  justify-center sm:ml-16 p-2.5 xl:p-5">
              <p className="text-left text-black  bg-gray-2 dark:bg-body/20 dark:text-white text-base">
                {request.name}
              </p>
            </div>

            <div className="flex items-center sm:ml-16  justify-start p-2.5 xl:p-5">
              {request.status === "Approved" ? (
                <button className="bg-body/90 cursor-default text-base px-3 py-1 rounded-lg flex gap-1 items-center text-white">
                  <BeenhereIcon fontSize="small" />{" "}
                  <div className="hidden md:block">Approved</div>
                </button>
              ) : request.status === "Rejected" ? (
                <div className="flex gap-2 ">
                  <button className="bg-meta-1 cursor-default text-base px-3 py-1 rounded-lg flex gap-1 items-center text-white">
                    <ThumbDownAltIcon fontSize="small" />
                    <div className="hidden md:block">Rejected</div>
                  </button>
                  <button
                    onClick={() => handleReinitate(key)}
                    className="bg-meta-6/90 text-base px-3 py-1 rounded-lg flex gap-1 items-center text-white"
                  >
                    <RestartAltIcon fontSize="small" />
                    <div className="hidden md:block">Reinitiate</div>
                  </button>
                </div>
              ) : request.status === "Pending" ? (
                <button className="bg-meta-1/60 dark:bg-warning cursor-default dark:bg-meta-6/60 text-base px-3 py-1 rounded-lg flex gap-2 items-center text-white">
                  <PendingActionsIcon fontSize="small" />{" "}
                  <div className="hidden md:block">Pending</div>
                </button>
              ) : (
                <button className="bg-primary/70  cursor-default text-base  px-3 py-1 rounded-lg flex gap-2 items-center text-white">
                  <NotStartedIcon fontSize="medium" />{" "}
                  <div className="hidden md:block">Not Started</div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
