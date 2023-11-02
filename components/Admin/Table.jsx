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
        className="dark:bg-gray-800 dark:text-white "
      />
      <style>
        {`.dark .MuiCheckbox-root {
         
            border-color: #64748B;
          
          }
          .dark .Mui-checked .MuiIconButton-root {
            color: #fff; 
          }
          .MuiDataGrid-columnHeader {
          
           font-size: 1rem;
          }
         .MuiDataGrid-pagination {
            background-color: #333; /* Set the background color of the pagination container */
            color: #fff; /* Set the text color of the pagination */
          }
          .MuiDataGrid-pagination ul li button {
            background-color: transparent; /* Set the background color of pagination buttons */
            color: #fff; /* Set the text color of pagination buttons */
          }
          .MuiDataGrid-pagination ul li button:hover {
            background-color: #444; /* Set the background color of pagination buttons on hover */
          }
          
        `}
      </style>
    </div>
  );
};

export default Table;
