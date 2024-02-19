import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const request = [
  {
    value: "Withdrawal",
    label: "Withdrawal",
  },
  {
    value: "Campus Residency",
    label: "Campus Residency",
  },
  {
    value: "Dismissal",
    label: "Dismissal",
  },
  {
    value: "Graduation",
    label: "Graduation",
  },
  {
    value: "Job Relocation",
    label: "Job Relocation",
  },
  {
    value: "End of Contract",
    label: "End of Contract",
  },
  {
    value: "Resignation",
    label: "Resignation",
  },
];

const TaskItem = () => {
  const [selectedTask, setSelectedTask] = useState(null);

   // fetch the steps from db
   const [stepData, setStepData] = useState(null);
   const [stepError, setStepError] = useState(null);

   const [draggedData, setDraggedData] = useState();
 
  const session = useSession();
  //console.log("session from my clearance", session?.data?.user.userId);
  const userId = session?.data?.user.userId;
  const firstname = session?.data?.user.firstname;
  const middlename = session?.data?.user.middlename;



  var stepType;
  var status;
  // if (session?.data?.user.role == "STUDENT") {
   
  //   stepType = "STUDENT";
  // } else if (session?.data?.user.role == "STAFF") {
  //   stepType = "STAFF";
  // }


  // fetch the starting office
  useEffect(() => {
    stepType=session?.data?.user.role;
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:3000/api/step");
        url.searchParams.append("stepType", stepType );
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const updatedData = data.map((user) => ({
          ...user,
          id: user._id,
        }));
        setStepData(updatedData);
        setDraggedData(updatedData[0].steps[0]);
        // console.log("13errrrrrrr",stepType );
        // status=updatedData[0].steps[0];
        
      } catch (error) {
        setStepError(error);
      }
    };


    fetchData(); // Fetch data once when component mounts

    // No cleanup or dependency array needed as we only want to fetch data once
  }, []);

  const handleTaskSelection = (task) => {
    setSelectedTask(task);
  };

  const handleSend = async () => {
    if (selectedTask != null) {
      if (session?.data?.user.role == "STUDENT") {
        try {
          console.log("222setDraggedDatastatus",draggedData );
          const response = await fetch("/api/studentRequest", {
            method: "POST",
            body: JSON.stringify({
              userId: userId,
              reason: selectedTask,
              status: draggedData,
              firstname: firstname,
              middlename: middlename,
              role: "STUDENT",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const responseData = await response.text();
            toast.success(responseData);
          }
        } catch (error) {
          toast.error("Invalid request");
          console.log(error);
        }
      }

      if (session?.data?.user.role == "STAFF") {
        try {
          console.log("222setDraggedDatastatus",draggedData );
          const response = await fetch("/api/staffRequest", {
            method: "POST",
            body: JSON.stringify({
              userId: userId,
              reason: selectedTask,
              status: draggedData,
              firstname: firstname,
              middlename: middlename,
              role: "STAFF",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const responseData = await response.text();
            toast.success(responseData);
          }
        } catch (error) {
          toast.error("Invalid request");
          console.log(error);
        }
      }
    } else {
      toast.info("Select your reason first");
    }
  };

  return (
    <div className="md:mt-7 mt-4 md:py-7 py-4 2xl:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 sm:px-7">
        <h5 className="dark:text-white font-satoshi text-4xl font-bold mb-4 text-primary sm:text-left">
          Choose the cause for your clearance
        </h5>
        <div className="pt-5  grid grid-cols-6  sm:gap-6 gap-4">
          <div className="md:ml-26 ml-4 grid grid-cols-1 lg:grid-cols-2 col-span-3 xl:gap-8 gap-5">
            {request.map((req) => (
              <label
                htmlFor={req.value}
                className="cursor-pointer text-primary text-lg font-md"
                key={req.value}
              >
                <div className="flex items-center pt-0.5">
                  <input
                    type="radio"
                    id={req.value}
                    name="task-radio-group"
                    value={req.value}
                    checked={selectedTask === req.value}
                    onChange={() => handleTaskSelection(req.value)}
                    className="dark:text-white marker:text-white"
                  />
                  <div className="dark:text-white box  flex h-5 w-5 items-center justify-center  dark-border-strokedark ">
                    <span
                      className={`text-white ${
                        selectedTask === req.value ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  </div>
                  <p className="dark:text-white">{req.label}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <button
          className="md:ml-26 ml-4 mt-10 flex text-lg justify-center rounded-lg bg-primary py-3 px-6 font-semibold text-gray hover:bg-opacity-95"
          onClick={handleSend}
          type="submit"
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
