"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SchoolIcon from "@mui/icons-material/School";
import ManageStudentOffices from "@/components/Admin/ManageStudentOffices";
import ManageAdminStaffOffices from "@/components/Admin/ManageAdminStaffOffices";
import ManageAcademicStaffOffices from "@/components/Admin/ManageAcademicStaffOffices";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Image from "next/image";
import AdminBreadcrumb from "@/components/Breadcrumb/adminBreadcrumb";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white sm:px-6 px-2 dark:bg-black dark:border-black">
      <AdminBreadcrumb
        title="Manage Apprvoal Steps"
        mainRoute="Admin"
        subRoute="Approval Steps"
      />

      <Box
        sx={{
          typography: "body1",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
        className="dark:border-strokedark dark:bg-boxdark"
      >
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="pt-2 px-4 dark-border-body  dark:bg-black dark:border-black"
          >
            <TabList
              indicatorColor="primary"
              textColor="#AEB7C0"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                sx={{
                  textTransform: "none",
                  color: "black",
                  fontSize: "1rem",
                }}
                className="dark:text-white font-bold text-lg focus:outline-black"
                label={
                  <div className="flex gap-2 font-satoshi">
                    <SchoolOutlinedIcon fontSize="small" />
                    <p>Student office steps</p>
                  </div>
                }
                value="1"
              />
              <Tab
                sx={{
                  textTransform: "none",
                  color: "black",
                  fontSize: "1rem",
                }}
                className="dark:text-white font-bold text-lg focus:outline-black"
                label={
                  <div className="flex gap-2 font-satoshi">
                    <AutoStoriesOutlinedIcon fontSize="small" />
                    <p>Academic-staff office steps</p>
                  </div>
                }
                value="2"
              />
              <Tab
                sx={{
                  textTransform: "none",
                  color: "black",
                  fontSize: "1rem",
                }}
                className="dark:text-white font-bold text-lg focus:outline-black"
                label={
                  <div className="flex gap-2 font-satoshi">
                    <ManageAccountsOutlinedIcon fontSize="small" />
                    <p>Admin-staff office steps</p>
                  </div>
                }
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ManageStudentOffices />
          </TabPanel>
          <TabPanel value="2">
            <ManageAcademicStaffOffices />
          </TabPanel>
          <TabPanel value="3">
            <ManageAdminStaffOffices />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
