"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import History from '@/components/User/History';
import Status from '@/components/User/Status';
import Box from '@mui/material/Box';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import RequestClearance from '@/components/User/RequestClearance';
import PrintClearance from '@/components/User/PrintClearance';

const iconStyle = {
  marginRight: '8px', // Adjust the margin as needed
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Help() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="py-8 px-14  my-12 mx-12 rounded-lg shadow shadow-white  dark:bg-black dark:border-black my-card" sx={{ minHeight: "100vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="dark:border-bodydark1">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              display: 'none', // Hide the indicator line
            },
          }}
          sx={{
            "& .Mui-selected": {
              borderBottom: '2px solid #687EFF', // Add the bottom border for the selected tab
            }
          }}
        >
          <Tab
            value={0}
            label={
              <div className='dark:text-white font-bold '>
                <RequestPageOutlinedIcon style={iconStyle} />
                Request Clearance
              </div>
            }
          />
          <Tab
            value={1}
            label={
              <div className='dark:text-white font-bold '>
                <HistoryRoundedIcon style={iconStyle} />
                History
              </div>
            }
          />
          <Tab
            value={2}
            label={
              <div className='dark:text-white font-bold '>
                <AutorenewOutlinedIcon style={iconStyle} />
                Status
              </div>
            }
          />
          <Tab
            value={3}
            label={
              <div className='dark:text-white font-bold '>
                <LocalPrintshopOutlinedIcon style={iconStyle} />
                Print Clearance
              </div>
            }
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <RequestClearance />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <History />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Status />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <PrintClearance />
      </CustomTabPanel>
    </Card>
  );
}
