import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_ORDERS_COUNTS } from "../../src/graphQL/queries";
import { useTheme } from "@mui/material/styles";
import { Box, Typography} from "@mui/material";


const OverviewChart = ({ isDashboard = false }) => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDERS_COUNTS);
  const theme = useTheme();

  if (loading) return "Loading...";
  if (error) return "Error.......";

  const chartData = data.getCustomerOrderCounts.map((item) => ({
    x: item.CustomerID,
    y: item.NumOrders,
  }));

  return (
     <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsiveLine
        data={[
          {
            id: "Orders",
            data: chartData,
          },
        ]}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
        
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisTop={null}
        axisRight={null}
        enableSlices="x"
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Customer IDs",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Orders",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enablePoints={true}
        pointSize={10}
        pointColor={theme.palette.background.default}
        pointBorderWidth={2}
        pointBorderColor={{ from: "color" }}
        pointLabelYOffset={-12}
        useMesh={false}
        enableCrosshair={false}
        enableArea={true}
        enableGridX={false} // disabling the grid lines for X-axis
        enableGridY={false} 
        tooltip={({ point }) => (
          <Typography variant="h6">
         Customer ID: {point.data.x} - Orders: {point.data.y}
        </Typography>
        )}
      />
    </Box>
  );
};

export default OverviewChart;
