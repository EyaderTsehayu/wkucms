import { DataGrid } from "@mui/x-data-grid";

const Table = ({ columns, rows }) => {
  return (
    <div style={{ height: 520, width: "100%" }}>
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
        className="dark:bg-gray-800 dark:text-white"
      />

    </div>
  );
};

export default Table;
