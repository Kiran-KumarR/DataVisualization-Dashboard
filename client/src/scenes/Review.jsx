import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,

} from "@mui/material";
import Header from "components/Header";
import { GET_ALL_REVIEWS } from "../graphQL/queries";
import { useQuery } from "@apollo/client";

const Review = ({ id, reviewer, product_id, rating, body }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent sx={{ width: "100px", height: "100px" }}>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {reviewer}
        </Typography>

        <Rating value={rating} readOnly />
      </CardContent>

      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Options
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>ID : {id}</Typography>
          <Typography>productID :{product_id}</Typography>
          <Typography>Review :{body}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
const ReviewsPage = () => {
  const { data, isLoading } = useQuery(GET_ALL_REVIEWS);
  const theme = useTheme();
  console.log("data", data);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      ></Box>

      <Header title="REVIEWS" subtitle="See your list of reviews." />
      {data && !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {Array.isArray(data.reviews) &&
            data.reviews.map(({ id, reviewer, product_id, rating, body }) => (
              <Review
                key={id}
                id={id}
                reviewer={reviewer}
                product_id={product_id}
                rating={rating}
                body={body}
              />
            ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default ReviewsPage;
