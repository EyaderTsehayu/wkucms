"use client";
import ClearanceNums from "@/components/Report/ClearanceNums";
import ReasonStaffReports from "@/components/Report/ReasonStaffReports";
import ReasonStudentReports from "@/components/Report/ReasonStudentReports";
import React, { useEffect, useState } from "react";

const ManageReport = () => {
  const [reasonReport, setReasonReport] = useState([]);

  useEffect(() => {
    const fetchReasonReports = async () => {
      try {
        const response = await fetch("/api/approvalHistory/reasonReport");
        const data = await response.json();

        if (response.ok) {
          setReasonReport(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReasonReports();
  }, []);

  //console.log("mange report", reasonReport);
  return (
    <div>
      <ClearanceNums approvedNum={reasonReport.length} />
      <div class=" col-span-12 row-span-6 xl:col-span-6">
        <ReasonStudentReports reason={reasonReport} />
        <ReasonStaffReports reason={reasonReport} />
      </div>
    </div>
  );
};

export default ManageReport;
