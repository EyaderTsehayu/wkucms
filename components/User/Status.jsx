import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Button } from '@mui/material';

const columns = [
    { id: 'office', label: 'Office Name', minWidth: 170 },
    { id: 'issueDate', label: 'Issue Date', minWidth: 100 },
    {
        id: 'rejectionReason',
        label: 'Rejection Reason',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'progress',
        label: 'Approval Progress',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

const statusColor = {
    pending: 'yellow',
    approved: 'green',
    disApproved: 'red',
};

function createData(office, issueDate, rejectionReason, progress) {
    return { office, issueDate, rejectionReason, progress };
}

const dominantButtonStyle = {
    backgroundColor: '#6499E9',
    color: 'white',
    border: '2px solid #6499E9',
    borderRadius: '45px',
    padding: '5px 10px',
};


const buttonJSX = <button className=' ' style={dominantButtonStyle}>Pending</button>;
const rows = [
    createData('Cafteria', 'IN', 1324171354, buttonJSX),
    createData('Library', 'CN', 1403500365, buttonJSX),
    createData('Dormitory', 'IT', 60483973, buttonJSX),
    createData('Sport', 'US', 327167434, buttonJSX),
    createData('Head office', 'CA', 37602103, buttonJSX),
    createData('dept Dean', 'AU', 25475400, buttonJSX),
    createData('Germany', 'DE', 83019200, buttonJSX),
    createData('Ireland', 'IE', 4857000, buttonJSX),
    createData('Mexico', 'MX', 126577691, buttonJSX),
    createData('Russia', 'RU', 146793744, buttonJSX),
    createData('Nigeria', 'NG', 200962417, buttonJSX),
    createData('Brazil', 'BR', 210147125, buttonJSX),
];

const headerCellStyle = {
    // fontWeight: 'bold',

};

const customFont = {
    fontFamily: 'satoshi',
    fontSize: "20px", /* Adjust the font size as needed */
    fontWeight: "normal" /* Adjust the font weight as needed */
}
export default function ColumnGroupingTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Check if the user is in dark mode (you might need a more precise method)
    const isDarkMode = window.matchMedia('(prefers-color-scheme: black)').matches;

    return (
        <div className="md:mt-7 mt-4 md:py-7 py-4 2xl:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">
            <h1 className="pl-4 font-satoshi text-3xl font-extrabold text-primary dark:text-white">Approval status</h1>
            {/* <br style={{ color: "white", backgroundColor: "white" }} /> */}
            <Paper sx={{ width: '100%' }} className='mt-7 ' >
                <TableContainer sx={{ height: "100%" }} >
                    <Table >
                        <TableHead >

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

                                        <h2 className=' text-lg dark:text-white font-satoshi  font-bold'>{column.label}</h2>


                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                                                    {column.format && typeof value === 'number'
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
            </Paper >
        </div>

    );
}
