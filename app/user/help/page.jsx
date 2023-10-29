"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import GeneralInfo from '@/components/User/GeneralInfo';
import Faq from '@/components/User/Faq';
import Box from '@mui/material/Box';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const iconStyle = {
  marginRight: '8px',
  color: "#687EFF"
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
              display: 'none',
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
              <div className='dark:text-white  '>
                <h1 className='font-bold'>
                  <InfoOutlinedIcon style={iconStyle} />
                  General Info
                </h1>
              </div>
            }
          />
          <Tab
            value={1}
            label={
              <div className='dark:text-white'>
                <h1 className='font-bold'>
                  <QuestionMarkOutlinedIcon style={iconStyle} />
                  FAQ
                </h1>
              </div>
            }
          />
        </Tabs>
      </Box>

      <CustomTabPanel className="mt-7" value={value} index={0}>
        <GeneralInfo />
      </CustomTabPanel>
      <CustomTabPanel className="mt-7" value={value} index={1}>
        <Faq />
      </CustomTabPanel>
    </Card>
  );
}
