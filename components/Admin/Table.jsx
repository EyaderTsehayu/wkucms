import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useMemo, useEffect } from "react";

const Table = ({ columns, rows, setSelectedRows, handleApproveAll }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  // const selectedRowsData = rows.filter((row) => row._id == rowSelectionModel);

  const selectedRowsData = useMemo(
    () => rows.filter((row) => rowSelectionModel.includes(row._id)),
    [rowSelectionModel, rows]
  );

  useEffect(() => {
    setSelectedRows(selectedRowsData);
  }, [selectedRowsData, setSelectedRows]);

  // console.log("Selected Rows Data:", selectedRowsData);

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
        columns={columns}
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
