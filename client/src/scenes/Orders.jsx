import React from "react";
import { Box, useTheme } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../graphQL/queries";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Orders = () => {
  const theme = useTheme();
  const { data, loading } = useQuery(GET_ALL_ORDERS);
  console.log("data", data);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "user_id",
      headerName: "CustomerID",
      flex: 0.3,
    },
    {
      field: "product_id",
      headerName: "ProductID",
      flex: 0.5,
    },
   
    {
      field: "total",
      headerName: "Price",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Entire list of Orders" />
      <Box
        mt="18px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid 
          loading={loading}
          rows={data ? data.orders : []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
