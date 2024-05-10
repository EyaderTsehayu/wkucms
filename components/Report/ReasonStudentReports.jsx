import React from "react";

const ReasonStudentReports = ({ reason }) => {
  const reasonCounts = {};

  // Loop through the data and count each reason
  reason.forEach((item) => {
    if (item.role == "STUDENT") {
      const reason = item.reason;
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    }
  });

  return (
    <div class="mb-4 mt-4 rounded-sm border border-stroke bg-white p-4 shadow-default  dark:border-strokedark dark:bg-boxdark md:mb-6 md:p-6 xl:p-7.5 2xl:mb-7.5 md:mt-6 2xl:mt-7.5">
      <div class="mb-7 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-semibold text-black dark:text-white">
            Reasons for students clearance
          </h3>
        </div>
      </div>
      <div class="flex flex-col gap-2 ">
        <div class="grid grid-cols-12 py-2">
          <div class="col-span-8">
            <p class="text-base font-semibold">Reason</p>
          </div>
          <div class="col-span-4">
            <p class="text-center text-base font-semibold">Count</p>
          </div>
        </div>

        {Object.keys(reasonCounts).map((reason) => (
          <div class="relative z-1 grid grid-cols-12 py-2">
            <span class="absolute left-0 top-0 -z-1 h-full w-[74%] rounded bg-gray dark:bg-meta-4"></span>
            <div class="col-span-8 pl-3.5">
              <p class="text-sm">{reason}</p>
            </div>
            <div class="col-span-4">
              <p class="text-center text-sm">{reasonCounts[reason]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonStudentReports;
