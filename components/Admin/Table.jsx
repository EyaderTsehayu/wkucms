import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ columns, rows }) => {
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
      />
    </Box>
  );
};

export default Table;
