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
    { id: 'date', label: 'Date', minWidth: 100 },
    {
        id: 'progress',
        label: 'Approval Progress',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    }
];

const statusMap = {
    pending: 'warning',
    delivered: 'success',
    refunded: 'error'
};

function createData(office, date, size, progress) {
    return { office, date, size, progress };
}

const dominantButtonStyle = {
    backgroundColor: '#6499E9',
    color: 'white',
    border: '2px solid #6499E9',
    borderRadius: "45px",
    padding: '5px 10px',


};

const containerStyle = {
    border: '2px solid #fff',
    borderRadius: "20px"
    // width: '70%', // Set the container width to 70%
    // margin: '0 auto', // Center the container horizontally
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
};


const black = {
    backgroundColor: "#132043"
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
    backgroundColor: "#F0F0F0"
    // Set the font weight to 'bold' for the header cells
};
const rowBorderStyle = {
    borderBottom: '2px solid #fff', // Change the border color here
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
        <div style={{ containerStyle }}>
            <Paper sx={{ width: '100%' }} style={containerStyle}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ borderLeft: '2px solid #fff', }} colSpan={5}>Approval Information</TableCell>
                            </TableRow>
                            <TableRow className='text'>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth, ...headerCellStyle }}
                                    >
                                        {column.label}
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
                                            style={{
                                                ...rowBorderStyle
                                            }}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} >
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
    );
}
