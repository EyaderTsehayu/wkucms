"use client";
import Link from "next/link";
import OuterNav from "@/components/Header/OuterNav";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../validations/userValidation";
export const metadata = {
  title: "Signin Page | Wolkite University Clearance Management System ",
  description: "This is Signin page for WKUCMS",
  // other metadata
};
import { yupResolver } from "@hookform/resolvers/yup";
//  import {  useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getSession, signIn } from "next-auth/react";
// import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Verify from "@/components/auth/Verify";
import RouteIcon from "@mui/icons-material/Route";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

const page = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const router = useRouter();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPassword),
  });

  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`/api/user/byUserId/${userId}`);
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch user data');
  //         }
  //         const data = await response.json();
  //         // setUserData(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const onSubmitHandler = async (data) => {
    try {
      const response = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("There was an error sending the reset password email.");
      }
      console.log("response", response);
      // Show success message and possibly redirect
      toast.success(
        "If the email is associated with an account, a password reset email will be sent."
      );

      const userId = data.userId;
      if (response.ok) {
        try {
          const response = await fetch(`/api/user/byUserId/${userId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const fetchedData = await response.json();
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }

        setLoading(true);
        //  router.replace(`/resetPassword`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send reset password email.");
    }
  };

  return (
    <>
      {loading ? (
        <Verify userData={userData} />
      ) : (
        <div className="flex flex-col bg-white h-screen">
          <div className="flex w-full ">
            <OuterNav />{" "}
          </div>{" "}
          <div className="flex  md:flex-row flex-col lg:px-24 md:px-12 md:py-12">
            <div className="md:w-1/2 w-full">
              <div className=" flex flex-col gap-8 pt-8">
                <h1 className="md:text-left text-center text-3xl font-extrabold text-primary dark:text-white    xl:text-title-xxl ">
                  Wolkite University Clearance Management System
                </h1>
                <h1 className="md:text-left text-center text-3xl font-extrabold text-primary dark:text-white    xl:text-title-xxl ">
                  "We Made It Easy"
                </h1>{" "}
                <div className="hidden md:block">
                  <p class="mb-6 text-base font-medium text-black ">
                    Use our all-in-one solution, enjoy a stress-free clearance
                    process.
                  </p>
                  <ul class="flex flex-wrap  gap-4">
                    <li>
                      <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                        <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                          Clear Pathway
                          <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                        </span>
                        <RouteIcon className="text-meta-4" fontSize="large" />
                      </p>
                    </li>
                    <li>
                      <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                        <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                          Efficient
                          <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                        </span>
                        <AdsClickIcon
                          fontSize="large"
                          className="text-primary"
                        />
                      </p>
                    </li>
                    <li>
                      <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                        <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                          Rapid Approval
                          <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                        </span>
                        <ElectricBoltIcon
                          className="text-meta-1"
                          fontSize="large"
                        />
                      </p>
                    </li>
                    <li>
                      <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                        <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                          Seamless Experience
                          <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                        </span>
                        <AutoFixHighIcon
                          className="text-warning"
                          fontSize="large"
                        />
                      </p>
                    </li>
                    <li>
                      <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                        <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                          Transparent Tracking
                          <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                        </span>
                        <StackedLineChartIcon
                          className="text-black"
                          fontSize="large"
                        />
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="flex mt-6 items-center gap-4"></div>
              </div>
            </div>
            <div className="lg:mx-16  mx-4 my-4 ">
              <div className=" rounded-lg border border-stroke shadow-meta-5  shadow-lg bg-white  dark:border-strokedark dark:bg-boxdark">
                <div className="w-full border-stroke dark:border-strokedark ">
                  <div className="w-full sm:p-14 p-6 ">
                    <h1 className="lg:mb-9 mb-4 md:text-4xl  text-3xl text-center font-extrabold text-black dark:text-white ">
                      Forgot Password
                    </h1>

                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                      <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          User Id
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="id"
                            placeholder="Enter your id"
                            {...register("userId")}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6  pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />

                          <span className="absolute right-4 top-4">
                            <svg
                              className="fill-current"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <p>{errors.id?.message}</p>
                      </div>

                      <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6  pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />

                          <span className="absolute right-4 top-4">
                            <svg
                              className="fill-current"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.5">
                                <path
                                  d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <p>{errors.id?.message}</p>
                      </div>

                      <div className="mb-5">
                        <button
                          type="submit"
                          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        >
                          Reset
                        </button>
                      </div>

                      <div className="mt-6 text-right">
                        <p>
                          <Link href="/signIn" className="text-primary">
                            Sign In ?
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default page;
