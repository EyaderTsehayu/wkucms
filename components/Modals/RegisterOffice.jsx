import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerOfficeSchema } from "@/validations/registrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const RegisterOffice = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerOfficeSchema) });

  const onSubmit = async (data) => {

    const fromFirstName=data.officeName.toLowerCase();
   

    // Generate a random number between 100 and 999
   
    const password=`${fromFirstName}@office`;

    console.log(data);
    try {
      const response = await fetch("/api/office", {
        method: "POST",
        body: JSON.stringify({
          officeId: data.officeId,
          officeName: data.officeName,
          password:password,
          location: data.location,
          items: data.items,
        }),
      });

      if (response.ok) {
        toast.success("Office registered Successfully!");
      }
    } catch (error) {
    toast.error("Office Not registered Successfully!");
      console.log(error);
    }
  
  
    reset();
  };
  return (
    <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8  dark:bg-boxdark md:py-15 md:px-8.5">
      <h3 className="pb-2 text-left text-lg font-bold text-black dark:text-white sm:text-2xl">
        Register Office
      </h3>
      <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5.5">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="emailAddress"
          >
            Office Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="officeName"
              id="officeName"
              placeholder="Office name"
              {...register("officeName")}
            />
          </div>
          <p>{errors.officeName?.message}</p>
        </div>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="phoneNumber"
            >
              Office ID
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="officeId"
              id="officeId"
              placeholder="Office id"
              {...register("officeId")}
            />
            <p>{errors.officeId?.message}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="fullName"
            >
              Location
            </label>
            <div className="relative">
              <input
                className="w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="location"
                id="location"
                placeholder="B-00"
                {...register("location")}
              />
            </div>
          </div>
        </div>
        <div className="mb-5.5">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="Username"
          >
            Items to be checked
          </label>
          <textarea
            className="w-full cols rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="items"
            id="items"
            placeholder="Write items to be checked here ..."
            cols={40}
            rows={4}
            {...register("items")}
          />
        </div>

        <div className="-mx-3 mt-10 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              type="submit"
              className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Save
            </button>
          </div>

          <div className="w-full px-3 2xsm:w-1/2">
            <button className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterOffice;
