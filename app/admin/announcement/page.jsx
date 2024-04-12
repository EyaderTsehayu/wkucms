"use client"
import React, { useState } from "react";
import Image from "next/image";
import { announcement } from "@/validations/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ManageAnnouncement = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(announcement),
  });


  const [selectedImage, setProfilePic] = useState(null)
  const [selectedImageBase64, setImageBase64] = useState(null)


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
      console.log("selectedImage", selectedImageBase64);
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

  const onSubmit = async (data) => {
    console.log(selectedImageBase64, "title", data.title, "description", data.description);
    // console.log("Submit button clicked", data.profilePic);
    // if (selectedImage) {

      try {
        const response = await fetch("/api/postAnnouncement", {
          method: "POST",
          body: JSON.stringify({
            userId: data.adminId,
            title: data.title,
            description: data.description,
            image: selectedImageBase64,
          }),
        });

        if (response.ok) {
          console.log(" Announcement posted Successfully!");
          toast.success("Announcement posted  Successfully!");
        } else {
          toast.error("First fill all the requied before posting!");
        }
      } catch (error) {

        console.log(error);
      }

      reset();
    
    // Now imageURL contains the link to the picked image.
  }


  return (
    <div className="col-span-12 xl:col-span-3">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-lg  font-semibold text-primary dark:text-white">
            Your Announcement
          </h3>
        </div>
        <div className="p-7">
          {/* <form action="#"> */}
          <form onSubmit={handleSubmit(onSubmit)}>



            {/* upload file */}
            {/* {selectedTask == "Health issues withdraw" && ( */}
            {/* <div
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

                {selectedImage && (
                  <Image
                  className="w-full h-1/5"
                    src={selectedImage} // Use the selected image URL
                    width={195}
                    height={175}
                    alt="User"
                  />
                ) 
                
                 }
              {!selectedImage &&  ( 
                <>
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
                  </>
                )
              }
                </div>
              </div> */}



            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="relative z-20 h-35 md:h-65">
                {selectedImage && (
                  <Image
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                    src={selectedImage} // Use the selected image URL
                    width={970}
                    height={260}
                    alt="User"
                  />
                )

                }

                {!selectedImage && (
                  <Image
                    src={"/images/cover/cover-01.png"}
                    alt="profile cover"
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                    width={970}
                    height={260}
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                  />
                )

                }
                <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                  <label
                    htmlFor="cover"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
                  >
                    {/* <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                /> */}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                     // onChange={handleFileChange}
                    // {...register("profilePic")}
                       

                     {...register("image", { onChange: handleFileChange })}
                    />
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span>Pic</span>
                  </label>
                </div>
              </div>


            </div>


            <div>
              <label className="mt-5 mb-3 block text-sm font-medium text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Write title"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                {...register("title")}
             />
            </div>

            <div>
              <label className="mt-5 mb-3 block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
               name="description"
               id="description"
                rows={6}
                placeholder="Write description"
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                {...register("description")}
             ></textarea>
            </div>

            {/* )} */}

            {/* <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="submit"
            >
              Cancel
            </button>
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
              type="submit"
            >
              Save
            </button>
          </div> */}
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="submit"
              >
                Cancel
              </button>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageAnnouncement;
