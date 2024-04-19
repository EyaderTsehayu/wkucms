"use client";
import Link from "next/link";

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
import { useRouter } from 'next/navigation'
const page = () => {
  // const router = useRouter();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPassword),
  });

  const onSubmitHandler = async (data) => {

    try {
      const response = await fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

      });

      if (!response.ok) {
        throw new Error('There was an error sending the reset password email.');
      }
      console.log("response", response);
      // Show success message and possibly redirect
      toast.success('If the email is associated with an account, a password reset email will be sent.');
      // Optionally, redirect to the login page or a page that says 'Check your email'
      // Redirect to the reset password page with parameters


      router.replace(`/resetPassword/${data.userId}`)
      // router.replace({
      //   pathname: '/resetPassword', // Specify the pathname
      //   query: { userId: data.userId }, // Specify the query parameters
      // });
      // router.push('/resetPassword', { email: data.email })
      // router.push({
      //   pathname: '/resetPassword',
      //   query: { email: data.email  }, // Add your query parameters here
      // });
      // Redirect to the reset password page with parameters
      //redirect({ url: `/resetpassword?email=${encodeURIComponent(data.email)}` });

    } catch (error) {
      toast.error(error.message || 'Failed to send reset password email.');
    }


  }


  return (
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
  );
};

export default page;
