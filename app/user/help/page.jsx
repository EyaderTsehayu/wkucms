"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GeneralInfo from '@/components/User/GeneralInfo';
import Faq from '@/components/User/Faq';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white sm:px-14  dark:bg-black dark:border-black">
      <h1 className="pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">Help</h1>
      <Box sx={{ typography: 'body1', backgroundColor: "white", minHeight: "100vh" }} className=" dark:border-black dark:bg-black" >
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="pt-2 px-4 dark:border-body">
            <TabList indicatorColor="primary" textColor='#AEB7C0' onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={{ textTransform: 'none', color: 'black', fontSize: "1rem" }} className=' dark:text-white font-bold text-lg focus:outline-black' label="General Information" value="1" />
              <Tab sx={{ textTransform: 'none', color: "black", fontSize: "1rem" }} className=' dark:text-white font-bold text-lg focus:outline-black' label="FAQ" value="2" />

            </TabList>
          </Box>
          <TabPanel value="1"><GeneralInfo /></TabPanel>
          <TabPanel value="2"><Faq /></TabPanel>

        </TabContext>
      </Box>
    </div>
  );
}
