// import { Box } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useState, useMemo, useEffect } from "react";

// const Table = ({ columns, rows, setSelectedRows, handleApproveAll,clickableColumns }) => {
//   const [rowSelectionModel, setRowSelectionModel] = useState([]);

//   // const selectedRowsData = rows.filter((row) => row._id == rowSelectionModel);

//   const selectedRowsData = useMemo(
//     () => rows.filter((row) => rowSelectionModel.includes(row._id)),
//     [rowSelectionModel, rows]
//   );

//   useEffect(() => {
//     setSelectedRows(selectedRowsData);
//   }, [selectedRowsData, setSelectedRows]);

//   // console.log("Selected Rows Data:", selectedRowsData);


//   return (
//     <Box
//       style={{ height: 520, width: "100%" }}
//       sx={{
//         "& .MuiDataGrid-footerContainer": {
//           borderTop: "none",
//           backgroundColor: "#34e1eb",
//         },
//         "& .MuiCheckbox-root": {
//           color: "#64748B",
//         },
//       }}
//       className="dark:bg-boxdark-2"
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 10 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         className="dark:bg-gray-800 dark:text-gray "
//         onRowSelectionModelChange={(newRowSelectionModel) => {
//           setRowSelectionModel(newRowSelectionModel);
//         }}
//         rowSelectionModel={rowSelectionModel}
//       />
//     </Box>
//   );
// };

// export default Table;




import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useMemo, useEffect } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Table = ({ columns, rows, setSelectedRows, handleApproveAll, clickableColumns }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [filteredRows, setFilteredRows] = useState(rows);

  if (!clickableColumns) {
    clickableColumns = [-1];
  }





  const selectedRowsData = useMemo(
    () => rows.filter((row) => rowSelectionModel.includes(row._id)),
    [rowSelectionModel, rows]
  );

  useEffect(() => {
    setSelectedRows(selectedRowsData);
  }, [selectedRowsData, setSelectedRows]);

  const handleClick = (params) => {
    // Access the correct field for the Base64-encoded image data
    const imageData = params.row.attachedFile; // Assuming the Base64-encoded image data is stored in a field named "attachedFile"

    // Create a new window to display the image
    const newWindow = window.open();

    // Set the document content to display the image
    newWindow.document.write(`<img src="${imageData}" />`);
  };


  return (
    <Box
      style={{ height: 520, width: "100%" }}
      sx={{
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "#34e1eb",
        },
        "& .MuiCheckbox-root": {
          color: "#64748B",
        },
      }}
      className="dark:bg-boxdark-2"
    >
      <DataGrid
        rows={rows}
        columns={columns.map((column, index) => ({
          ...column,
          renderCell: (params) => (
            <div
           
              style={{ cursor: clickableColumns.includes(index) ? 'pointer' : 'auto',paddingLeft:clickableColumns.includes(index) ? '20px' : '0px'}}
              onClick={() => handleClick(params, params.id)}
            >

              {(clickableColumns.includes(index) && params.value)
                ? <OpenInNewIcon />
                : params.value}
            </div>
          ),
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        className="dark:bg-gray-800 dark:text-gray "
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
};

export default Table;
