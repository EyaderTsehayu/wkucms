"use client"


import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PrintClearance from '@/components/User/PrintClearance';
import Status from '@/components/User/Status';
import RequestClearance from '@/components/User/RequestClearance';
import History from '@/components/User/History';

import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

import { useState } from "react";
import useSWR from "swr";

const iconStyle = {
  marginRight: '8px', // Adjust the margin as needed
};
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map((user) => ({
    ...user,
    id: user._id,
    roleId: user._id,
  }));
  return updatedData;
};

export default function LabTabs() {

 
  // var index="1"
  // if(!userData[0].status){
  //   index="2"
  // }
  const [value, setValue] =useState("3");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a = [];
  // Step 3: Use useEffect to trigger the API request
  const { data: userData, error } = useSWR(
    "http://localhost:3000/api/userStatus",
    fetcher,
    {
      initialData: a,
      revalidateOnFocus: false,
      refreshInterval: 2000, // Set the refresh interval in milliseconds (e.g., 10000 for 10 seconds)
    }
  );
  console.log("session from approval ad ", userData);
  // Handle loading and fetch errors
  if (!userData && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }


  return (
    <div className="bg-white sm:px-14 dark:bg-black dark:border-black">
      <h1 className="pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">My Clearance</h1>
      <Box sx={{ typography: 'body1', backgroundColor: "white", minHeight: "100vh" }} className="dark:border-black dark:bg-black" >
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="pt-2 px-4 dark:border-body">
            <TabList indicatorColor="primary" textColor='#AEB7C0' onChange={handleChange} aria-label="lab API tabs example" >
              {!userData[0]?.status && (
              <Tab
                sx={{ textTransform: 'none', color: 'black', fontSize: '1rem' }}
                className='dark:text-white'
                value='1'
                label={
                  <div className='flex'>
                    <RequestPageOutlinedIcon className='mr-2' /> Request Clearance
                  </div>
                }
              />
              )} 
              <Tab sx={{ textTransform: 'none', color: "black", fontSize: "1rem" }}
                className=' dark:text-white  '
                value="3"
                label={
                  <div className="flex">
                    <AutorenewOutlinedIcon className='mr-2' /> Status
                  </div>
                }
              />

              <Tab sx={{ textTransform: 'none', color: "black", fontSize: "1rem" }}
                className=' dark:text-white  '
                value="2"
                label={
                  <div className="flex">
                    <AutorenewOutlinedIcon className='mr-2' /> History
                  </div>
                }
              />
              <Tab sx={{ textTransform: 'none', color: "black", fontSize: "1rem" }}
                className=' dark:text-white  '
                value="4"
                label={
                  <div className="flex">
                    <LocalPrintshopOutlinedIcon className='mr-2' /> Print Clearance
                  </div>
                }
              />
            </TabList>
          </Box>

          <>
            <TabPanel value="1">
              <RequestClearance />
            </TabPanel>
            <TabPanel value="2">
              <History />
            </TabPanel>
            <TabPanel value="3">
              <Status />
            </TabPanel>
            <TabPanel value="4">
              <PrintClearance />
            </TabPanel>
          </>



        </TabContext>
      </Box>
    </div>
  );
}
