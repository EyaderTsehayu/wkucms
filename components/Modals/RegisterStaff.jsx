"use client";

import { registerStaffSchema } from "@/validations/registrationValidation";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {ROLES } from "@/utils/constants";

const RegisterStaff = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(registerStaffSchema) });

    // const onSubmit = (data) => {
    //     console.log(data);
    //     toast.success("Staff registered Successfully!");
    //     reset();
    // };

    const onSubmit = async (data) => {
        console.log(data);
        try {
          const response = await fetch("/api/user/new", {
            method: "POST",
            body: JSON.stringify({
             userId: data.staffId,
              firstname: data.firstName,
              middlename: data.middleName,
              lastname: data.lastName,
              staffId:data.staffId,
            //   collegeId: data.collegeId,
            //   departmentId: data.departmentId,
            //   year: data.year,
            officeName:data.officeName,
              role: ROLES.STAFF,
            }),
          });
    
          if (response.ok) {
            toast.success("Staff registered Successfully!");
          }
        } catch (error) {
        toast.error("Staff Not registered Successfully!");
          console.log(error);
        }
      
      
        reset();
      };

    return (
        <div class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8  dark:bg-boxdark md:py-15 md:px-8.5">
            <h3 class="pb-2 text-left text-lg font-bold text-black dark:text-white sm:text-2xl">
                Register Staff
            </h3>
            <span class="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="firstName"
                        >
                            First Name
                        </label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Your name"
                            {...register("firstName")}
                        />
                        <p>{errors.firstName?.message}</p>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="middleName"
                        >
                            Middle Name
                        </label>
                        <div className="relative">
                            <input
                                className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="middleName"
                                id="middleName"
                                placeholder="Father's name"
                                {...register("middleName")}
                            />
                            <p>{errors.middleName?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="lastName"
                        >
                            Last Name
                        </label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Grand father's Name"
                            {...register("lastName")}
                        />
                        <p>{errors.lastName?.message}</p>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="staffId"
                        >
                            Staff Id
                        </label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="staffId"
                            id="staffId"
                            placeholder="staff id"
                            {...register("staffId")}
                        />
                        <p>{errors.staffId?.message}</p>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                    <div className="w-full sm:w-1/2">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="officeName"
                        >
                            Office
                        </label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="officeName"
                            id="officeName"
                            placeholder="Office Name"
                            {...register("officeName")}
                        />
                        <p>{errors.officeName?.message}</p>
                    </div>



                </div>

                <div class="-mx-3 mt-10 flex flex-wrap gap-y-4">
                    <div class="w-full px-3 2xsm:w-1/2">
                        <button
                            type="submit"
                            class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                        >
                            Save
                        </button>
                    </div>

                    <div class="w-full px-3 2xsm:w-1/2">
                        <button class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                            Cancel
                        </button>
                    </div>
                </div>

            </form>

        </div>
    );
};
export default RegisterStaff;
