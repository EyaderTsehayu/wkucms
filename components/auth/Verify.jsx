import React from 'react'


import { useForm } from "react-hook-form";
import { verficationSchema } from "@/validations/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import bcrypt from "bcryptjs";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
const Verify = ({ userData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        resolver: yupResolver(verficationSchema),
      });

      const router = useRouter();
      const onSubmitHandler = async (data) => {
         // Get the updated session after sign-in
        // console.log("Hello Role -- ", session?.user?.role);
        // const role = session?.user?.role;
    
        // router.push('/resetPassword', { email: data.email })
        console.log("userVerfica", userData[0].verificationCode);
        console.log("userData", data.verificationCode);
        const passwordMatch = await bcrypt.compare(
          data.verificationCode,
          userData[0].verificationCode
        );
    
        console.log("Password Matched", passwordMatch);
        if (passwordMatch ) {
         
           router.replace("/newPassword/"+userData[0].userId);
        }
      };
  return (
    <div className="flex items-center justify-center  dark:bg-boxdark-2 dark:text-bodydark">
    <div className=" mt-35 w-1/3 h-1/3 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-lg  font-semibold text-primary dark:text-white">
          Reset Password
        </h3>
      </div>

      <div className="p-7">
        <h1>
          Please check your emails for a message with your code. Your code is
          6 numbers long.
        </h1>
        {/* <h1> {email}</h1> */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="relative">
            <input
              type="text"
              id="id"
              placeholder="Enter your verification code"
              {...register("verificationCode")}
              className="w-full rounded-lg border border-stroke bg-transparent my-5 py-4 pl-6  pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
              type="submit"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Verify