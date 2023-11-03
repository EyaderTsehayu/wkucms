"use client";
import React from "react";
import { useState } from "react";

const RegisterStudent = () => {
  return (
    <div class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
      <h3 class="pb-2 text-lg font-bold text-black dark:text-white sm:text-2xl">
        Your Message Sent Successfully
      </h3>
      <span class="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
      <p class="mb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since
      </p>
      <div class="-mx-3 flex flex-wrap gap-y-4">
        <div class="w-full px-3 2xsm:w-1/2">
          <button class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
            Cancel
          </button>
        </div>
        <div class="w-full px-3 2xsm:w-1/2">
          <button class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
