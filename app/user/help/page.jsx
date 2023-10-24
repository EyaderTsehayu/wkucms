"use client"
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import GeneralInfo from '@/components/User/GeneralInfo';
// import Faq from '@/components/User/Faq';
// import { Card } from '@mui/material';

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function Help() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (

//     <Card className="dark:bg-black dark:border-black" sx={{ borderColor: 'white', borderWidth: '5px', borderStyle: 'solid', borderRadius: "15px", background: "white", height: '100vh', width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab className='dark:text-white' label="General Info" {...a11yProps(0)} />
//           <Tab className='dark:text-white' label="FAQ" {...a11yProps(1)} />

//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <GeneralInfo />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <Faq />
//       </CustomTabPanel>
//     </Card>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GeneralInfo from '@/components/User/GeneralInfo';
import Faq from '@/components/User/Faq';
import Card from '@mui/material/Card';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Help() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="dark:bg-black dark:border-black my-card">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className="dark:text-white my-tab" label="General Info" {...a11yProps(0)} />
          <Tab className="dark:text-white my-tab" label="FAQ" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GeneralInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Faq />
      </CustomTabPanel>
    </Card>
  );
}

