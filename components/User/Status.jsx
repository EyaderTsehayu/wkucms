import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

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

const containerStyle = {
    // border: '2px solid #fff',
    // borderRadius: '7px',
};
const buttonJSX = <button style={dominantButtonStyle}>PENDING</button>;
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
    fontWeight: 'bold',
    backgroundColor: '#F0F0F0 dark:bg-black',
};

const rowBorderStyle = {
    // borderBottom: '2px solid #fff',
};

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

        <Paper sx={{ width: '100%' }} style={containerStyle}>
            <TableContainer sx={{ height: "100%" }} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={`dark:bg-black dark:text-white dark:border-body `}
                                style={{
                                    // borderLeft: '2px solid #fff',
                                    fontSize: '36px',
                                    marginBottom: '10px',
                                }}
                                colSpan={5}
                            >
                                Approval Information
                            </TableCell>
                        </TableRow>
                        <TableRow className="text">
                            {columns.map((column) => (
                                <TableCell
                                    className={`dark:bg-black dark:text-white dark:border-body }`}
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        top: 57,
                                        minWidth: column.minWidth,
                                        ...headerCellStyle,
                                    }}
                                >
                                    {column.label}
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
                                    style={{
                                        ...rowBorderStyle,
                                    }}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                className={`dark:bg-black dark:text-white dark:border-body `}
                                                key={column.id}
                                                align={column.align}
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
                className={`dark:bg-black dark:text-white dark:border-body `}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );
}
