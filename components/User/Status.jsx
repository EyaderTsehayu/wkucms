import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { Button } from "@mui/material";
// import { useState } from "react";
import useSWR from "swr";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ROLES, STUDENTSTEPS } from "@/utils/constants";
import { toast } from "react-toastify";
import { getSession, signIn } from "next-auth/react";


const columns = [
  { id: "stepName", label: "Ofiice Name", minWidth: 170 },
  { id: "status", label: "Progress", minWidth: 100 },
];

function createData(stepName, status) {
  return {
    stepName,
    status: (
      <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        {status === "approved" && (
          <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-success bg-success">
            {status}
          </p>
        )}

        {status === "pending" && (
          <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-warning bg-warning">
            {status}
          </p>
        )}

        {status === "not started" && (
          <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-danger bg-danger">
            {status}
          </p>
        )}
      </div>
    ),
  };
}

const dominantButtonStyle = {
  backgroundColor: "#6499E9",
  color: "white",
  border: "2px solid #6499E9",
  borderRadius: "45px",
  padding: "5px 10px",
};

const buttonJSX = (
  <button className=" " style={dominantButtonStyle}>
    Pending
  </button>
);

// const rows = [];
// let step = ["HEAD", "DEAN", "DORM", "CAFTERIA"];
// let status = "DEAN";
// for (let i = 0; i < step.length; i++) {
//     const row = createData(step[i], step[i] === status ? 'pending' : step.indexOf(status) > i ? 'approved' : 'notstarted');
//     rows.push(row);
// }
// const headerCellStyle = {
//     // fontWeight: 'bold',

// };

const customFont = {
  fontFamily: "satoshi",
  fontSize: "20px" /* Adjust the font size as needed */,
  fontWeight: "normal" /* Adjust the font weight as needed */,
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

export default function ColumnGroupingTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  
  const { data: session } = useSession();
  const router = useRouter();

  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stepData, setStepData] = useState(null);
  const [stepError, setStepError] = useState(null);
  // console.log("data iuiuu dgfgdfgfdgf");
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


  let status;
  // if the user does not request the clearance
  status = userData[0]?.status?.trim().toLowerCase() ?? "Null";

  let ct = 0;
  // fetch steps from db

// create history
const createHistory = async () => {

  try {
    const response = await fetch("/api/approvalHistory", {
      method: 'POST',
      body: JSON.stringify({
        userId: userData[0]?.userId ?? 'Null',
        reason: userData[0]?.reason ?? 'Null',
        status: userData[0]?.status ?? 'Null',
        firstname: userData[0]?.firstname ?? 'Null',
        middlename: userData[0]?.middlename ?? 'Null',
        role: userData[0]?.role ?? 'Null',
        dateRequested: userData[0]?.dateRequested ?? 'Null',
        clearanceId: userData[0]?._id ?? 'NULL'
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseData = await response.text();
      toast.success(responseData);
      // router.push("/user");
    }
  } catch (error) {
    toast.error('Invalid request');
    console.log(error);
  }

};


  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/api/step");
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     const updatedData = data.map((user) => ({
    //       ...user,
    //       id: user._id,
    //     }));
    //     setStepData(updatedData);
    //   } catch (error) {
    //     setStepError(error); // Corrected from `error` to `stepError`
    //   }
    // };
    const fetchData = async () => {
      const session = await getSession(); // Get the updated session after sign-in
      console.log("Hello Role -- ", session?.user?.role);
      const role = session.user?.role;
      try {
        const stepType = role; // Define your stepType here
        const url = new URL("http://localhost:3000/api/step");
        url.searchParams.append("stepType", stepType);
    
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const updatedData = data.map((user) => ({
          ...user,
          id: user._id,
        }));
        setStepData(updatedData);
        // setDraggedData(updatedData[0].steps);
        // console.log("setDraggedData", draggedData);
      } catch (error) {
        setStepError(error);
      }
    };

    fetchData(); // Fetch data once when component mounts
    // generate history

    if (status.toUpperCase() === 'APPROVED') {
      ct += 1;
      if (ct == 1) {
        createHistory();
      }

    }
    // The useEffect will re-run whenever the 'status' changes


    // No cleanup or dependency array needed as we only want to fetch data once
  }, [stepData]);

  if (stepData) {

    console.log("stepData ", stepData[0].steps)
  }

  // Render loading state
  if (!stepData && !stepError) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (stepError) {
    console.error("Error fetching data:", stepError);
    return <p>Failed to fetch data</p>;
  }


  // // generate history
  // let status;
  // // if the user does not request the clearance
  // status = userData[0]?.status?.trim().toLowerCase() ?? "Null";

  //   let ct = 0;
  //   useEffect(() => {
  //         if (status.toUpperCase() === 'APPROVED') {
  //     ct += 1;
  //     if (ct == 1) {
  //       createHistory();
  //     }

  //   }
  // }, [status]); // The useEffect will re-run whenever the 'status' changes




  //
  const rows = [];

  let step;
  if (session?.user?.role && session?.user?.role.toUpperCase() === ROLES.STUDENT.toUpperCase()) {
    step = stepData[0].steps;
  }
  if (session?.user?.role && session?.user?.role.toUpperCase() === ROLES.STAFF.toUpperCase()) {
    step = stepData[0].steps;
  }
  // if (session?.user?.role == ROLES.STAFF) {
  //   step = STAFFSTEPS;
  // }


  const capitalize = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };



  //const currentIndex = studentApproval.indexOf(capitalize(existingRequest.status?.trim().toLowerCase()));
  // let status = "COLLEGEDEAN";
  console.log("status a", status);
  if(step){

    for (let i = 0; i < step.length - 1; i++) {
      const row = createData(
        step[i],
        // step[i] === status
        step[i]?.trim().toLowerCase() === status
  
          ? "pending"
          : step.indexOf(capitalize(status)) >i
            ? "approved"
            : "not started"
            );
            console.log(i,"=>",step[i],"status",step.indexOf(capitalize(status)));
      rows.push(row);
    }
  }
  const headerCellStyle = {
    // fontWeight: 'bold',
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  

  const handlePrintClearance = () => {
    // Navigate to the /user/PrintClearance route
    router.push(`/user/PrintClearance?clearanceId=${userData[0]?._id}`);
  };

  // Use useEffect to call createHistory when the component mounts
  // if (status.toUpperCase() === 'APPROVED'.toUpperCase()) {

  // createHistory();
  // Empty dependency array means this effect runs once on mount

  // }

  // Use useEffect to call createHistory when the component mounts

  // Check if the user is in dark mode (you might need a more precise method)
  const isDarkMode = window.matchMedia("(prefers-color-scheme: black)").matches;

  return (
    <>
      {status.toUpperCase() !== "APPROVED" && (


        <div className="md:mt-7 mt-4 md:py-7 py-4 2xl:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
          <h1 className="pl-4 font-satoshi text-3xl font-extrabold text-primary dark:text-white">
            Approval status
          </h1>
          {/* <br style={{ color: "white", backgroundColor: "white" }} /> */}
          <Paper sx={{ width: "100%" }} className="mt-7 ">
            <TableContainer sx={{ height: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow className=" ">
                    {columns.map((column) => (
                      <TableCell
                        className={`dark:bg-boxdark  dark:text-white dark:border-body}`}
                        key={column.id}
                        align={column.align}
                        style={{
                          top: 57,
                          minWidth: column.minWidth,
                          ...headerCellStyle,
                        }}
                      >
                        <h2 className=" text-lg dark:text-white font-satoshi  font-bold">
                          {column.label}
                        </h2>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.date}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                className={`dark:bg-boxdark dark:text-white `}
                                key={column.id}
                                align={column.align}
                                style={{ ...customFont }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={`dark:bg-boxdark dark:text-white `}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
      {status.toUpperCase() === "APPROVED".toUpperCase() && (
        <>
          {/* { createHistory()} */}
          <div className="relative md:mt-7 mt-4 md:py-7 lg:py-4 py-8   px-4 lg:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
            <div className="md:mt-12 lg:mt-12 mt-8 ">
              <h5 className="dark:text-white font-satoshi text-4xl font-bold mb-4 text-primary text-center">
                Congrats on successfully finishing the clearance procedure. The clearance is now ready for printing !!
              </h5>
              <button
                onClick={handlePrintClearance}
                //  href="/user/PrintClearance"
                className="absolute lg:bottom-10 bottom-1 right-10 text-primary dark:text-white text-lg font-bold py-3 px-8 transition-all border border-primary rounded-full hover:bg-primary hover:text-white"
              >
                Print Clearance
              </button>
            </div>
            <h5 className="dark:text-white font-satoshi text-4xl font-bold mb-4 text-primary text-center">

            </h5>



          </div>
        </>
      )}
    </>
  );
}
// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Button } from '@mui/material';

// const columns = [
//     { id: 'stepName', label: 'Step Name', minWidth: 170 },
//     { id: 'status', label: 'Status', minWidth: 100 },
// ];

// const statusColor = {
//     pending: 'yellow',
//     approved: 'green',
//     notStarted: 'gray',
// };

// const dominantButtonStyle = {
//     backgroundColor: '#6499E9',
//     color: 'white',
//     border: '2px solid #6499E9',
//     borderRadius: '45px',
//     padding: '5px 10px',
// };

// const createData = (stepName, status) => ({ stepName, status });

// const getRows = (step = [], status) => {
//     const rows = [];

//     for (let i = 0; i < step.length; i++) {
//         const row = createData(step[i], step[i] === status ? 'pending' : step.indexOf(status) > i ? 'approved' : 'not started');
//         rows.push(row);
//     }

//     return rows;
// };

// export default function ColumnGroupingTable({ step, status }) {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     return (
//         <div className="md:mt-7 mt-4 md:py-7 py-4 2xl:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
//             <h1 className="pl-4 font-satoshi text-3xl font-extrabold text-primary dark:text-white">Approval status</h1>
//             <Paper sx={{ width: '100%' }} className='mt-7'>
//                 <TableContainer sx={{ height: '100%' }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         className={`dark:bg-boxdark  dark:text-white dark:border-body`}
//                                         key={column.id}
//                                         align={column.align}
//                                         style={{
//                                             top: 57,
//                                             minWidth: column.minWidth,
//                                         }}
//                                     >
//                                         <h2 className='text-lg dark:text-white font-satoshi font-bold'>{column.label}</h2>
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {getRows(step, status)
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row, index) => (
//                                     <TableRow hover role="checkbox" tabIndex={-1} key={row.stepName}>
//                                         {columns.map((column) => (
//                                             <TableCell
//                                                 className={`dark:bg-boxdark dark:text-white `}
//                                                 key={column.id}
//                                                 align={column.align}
//                                             >
//                                                 {column.id === 'status' ? (
//                                                     <Button
//                                                         style={{
//                                                             backgroundColor: statusColor[row.status],
//                                                             color: 'white',
//                                                             borderRadius: '45px',
//                                                             padding: '5px 10px',
//                                                         }}
//                                                     >
//                                                         {row.status}
//                                                     </Button>
//                                                 ) : (
//                                                     row[column.id]
//                                                 )}
//                                             </TableCell>
//                                         ))}
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     className={`dark:bg-boxdark dark:text-white `}
//                     rowsPerPageOptions={[10, 25, 100]}
//                     component="div"
//                     count={getRows(step, status).length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Paper>
//         </div>
//     );
// }
