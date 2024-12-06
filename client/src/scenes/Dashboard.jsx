import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BreakdownChart from "../components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import {
  GET_NUMBER_OF_PRODUCTS,
  GET_NUMBER_OF_ORDERS,
  GET_NUMBER_OF_CUSTOMERS,
} from "../graphQL/queries";
import StatBox from "components/StatBox";
import { useQuery } from "@apollo/client";
import html2pdf from "html2pdf.js";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: dataProducts, loading: loadingProducts } = useQuery(
    GET_NUMBER_OF_PRODUCTS
  );
  const { data: dataOrders, loading: loadingOrders } =
    useQuery(GET_NUMBER_OF_ORDERS);
  const { data: dataCustomers, loading: loadingCustomers } = useQuery(
    GET_NUMBER_OF_CUSTOMERS
  );

  const handleDownload = () => {
    const element = document.documentElement; // Capture the entire document

    html2pdf().from(element).save("webpage.pdf");
  };

  console.log("data", dataProducts);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            onClick={handleDownload}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="# Products"
          value={dataProducts && dataProducts.getNumberofProducts}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="# Customers"
          value={dataCustomers && dataCustomers.getNumberofCustomers}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="# Transactions "
          value={dataOrders && dataOrders.getNumberofOrders}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>

      <Box
        m="1rem 1rem"
        gridColumn="span 6"
        gridRow="span 1"
        backgroundColor={theme.palette.background.alt}
        p="0.5rem"
        borderRadius="0.55rem"
      >
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          Products by Category
        </Typography>
        <BreakdownChart isDashboard={true} />
      </Box>

      <Box
        m="1rem 1rem"
        gridColumn="span 6"
        gridRow="span 1"
        backgroundColor={theme.palette.background.alt}
        p="0.5rem"
        borderRadius="0.55rem"
      >
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          Customer-Order Counts
        </Typography>
        <OverviewChart isDashboard={true} />
      </Box>
    </Box>
  );
};

export default Dashboard;
