import React from "react";
import Header from "components/Header";
import { Box } from "@mui/material";
import OverViewChart from "components/OverviewChart";

const OverView = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="Overview of Customer and their Orders" />
      <Box mt="40px" height="75vh">
        <OverViewChart />
      </Box>
    </Box>
  );
};

export default OverView;
