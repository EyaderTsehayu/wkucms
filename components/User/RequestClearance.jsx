import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
const requestForStud = [
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
 

];



const requestForStaff = [

  {
    value: "Campus Residency",
    label: "Campus Residency",
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

  const [selectedImage, setProfilePic] = useState(null)
  const [imageBase64, setImageBase64] = useState(null);

  const session = useSession();
  //console.log("session from my clearance", session?.data?.user.userId);
  const userId = session?.data?.user.userId;
  const firstname = session?.data?.user.firstname;
  const middlename = session?.data?.user.middlename;
  const collegeName = session?.data?.user.collegeName;
  const departmentName = session?.data?.user.departmentName;
  const _userId = session?.data?.user.id;
  const role = session?.data?.user.role;

  var stepType;
  var status;
  // if (session?.data?.user.role == "STUDENT") {

  //   stepType = "STUDENT";
  // } else if (session?.data?.user.role == "STAFF") {
  //   stepType = "STAFF";
  // }


  // fetch the starting office
  useEffect(() => {
    console.log("departmentName", departmentName);
    console.log("_userId", _userId);

    stepType = session?.data?.user.role;
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:3000/api/step");
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




  // upload file
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    // console.log("Image selectedImage:", selectedFile);
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);

      const base64 = await convertToBase64(selectedFile);
      // console.log("base64",base64)
      setImageBase64(base64);

      // console.log("Image profilePic:", userData.profilePic);
      setProfilePic(imageURL);
       console.log("imageBase64dd",imageBase64);
    }

  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  // 









  const handleTaskSelection = (task) => {
    setSelectedTask(task);
  };

  const handleSend = async () => {
    console.log("departmentName");


    console.log("departmentName", departmentName);
    console.log("_userId", _userId);
    console.log("imageBase64",imageBase64);
    if (selectedTask != null) {
      if (session?.data?.user.role == "STUDENT") {
        try {
          console.log("222setDraggedDatastatus", draggedData);
          const response = await fetch("/api/studentRequest", {
            method: "POST",
            body: JSON.stringify({
              userId: userId,
              reason: selectedTask,
              status: draggedData,
              firstname: firstname,
              middlename: middlename,
              collegeName: collegeName,
              departmentName: departmentName,
              _userId: _userId,
              role: "STUDENT",
              attachedFile: imageBase64
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
          console.log("222setDraggedDatastatus", draggedData);
          const response = await fetch("/api/staffRequest", {
            method: "POST",
            body: JSON.stringify({
              userId: userId,
              reason: selectedTask,
              status: draggedData,
              firstname: firstname,
              middlename: middlename,
              collegeName: collegeName,
              departmentName: departmentName,
              _userId: _userId,
              role: "STAFF",
              attachedFile: imageBase64
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
    <div className="flex flex-row">
      <div className="md:mt-7 mt-4 md:py-7 py-4 2xl:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 sm:px-7">
          <h5 className="dark:text-white font-satoshi text-4xl font-bold mb-4 text-primary sm:text-left">
            Choose the cause for your clearance
          </h5>
          <div className="pt-5  grid grid-cols-6  sm:gap-6 gap-4">
            <div className="md:ml-26 ml-4 grid grid-cols-1 lg:grid-cols-2 col-span-3 xl:gap-8 gap-5">
              {(role == "STUDENT" ? requestForStud : requestForStaff).map((req) => (
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
                        className={`text-white ${selectedTask === req.value ? "opacity-100" : "opacity-0"
                          }`}
                      ></span>
                    </div>
                    <p className="dark:text-white">{req.label}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* upload file */}
            {/* {selectedTask == "Health issues withdraw" && ( */}
              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={handleFileChange}
                // {...register("profilePic")}


                // {...register("profilePic", { onChange: handleFileChange })}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3C50E0"
                      />
                    </svg>
                  </span>
                  <p>
                    <span className="text-primary">Click to upload a file</span> or drag and drop it if you need to submit important documents for processing.
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>
              <div className="h-94 w-57 ">
                {selectedImage && (
                  <Image
                    src={selectedImage} // Use the selected image URL
                    width={195}
                    height={175}
                    alt="User"
                  />
                ) 
                // :
                //   <Image
                //     src={"/images/user/default.png"}
                //     width={115}
                //     height={155}
                //     alt="User"
                //   />
                 }
              </div>
            {/* )} */}
            {/*  */}

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
    </div>

  );
};

export default TaskItem;


// Compare this snippet from app/api/user/new/route.js: