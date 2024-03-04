import ClearanceNums from "@/components/Report/ClearanceNums";
import ReasonStaffReports from "@/components/Report/ReasonStaffReports";
import ReasonStudentReports from "@/components/Report/ReasonStudentReports";
import React from "react";

const ManageReport = () => {
  return (
    <div>
      <ClearanceNums />
      <div class=" col-span-12 row-span-6 xl:col-span-6">
        <ReasonStudentReports />
        <ReasonStaffReports />
      </div>
    </div>
  );
};

export default ManageReport;
