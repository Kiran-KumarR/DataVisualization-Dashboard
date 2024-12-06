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
  IconButton,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import { GET_ALL_PRODUCTS } from "../graphQL/queries";
import { useQuery } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_NEW_PRODUCT,
} from "../graphQL/mutations";
import { useMutation } from "@apollo/client";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from '@mui/icons-material/Edit';
const Product = ({ id, title, vendor, price, rating, category }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedVendor, setUpdatedVendor] = useState(vendor);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedRating, setUpdatedRating] = useState(rating);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    variables: { id },
    onCompleted: () => {
      //console.log("Product" +id+"has been successfully deleted.");
      setIsDeleted(true);
    },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    variables: { id },
    onCompleted: () => {
      setIsEditing(true); //  setIsEditing(false);
    },
  });
  const handleDelete = () => {
    deleteProduct().then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 2 seconds delay
    });
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProduct({
      variables: {
        id: id,
        productInput: {
          id: id,
          title: updatedTitle,
          vendor: updatedVendor,
          price: parseFloat(updatedPrice),
          rating: parseFloat(updatedRating),
          category: updatedCategory,
        },
      },
    }).then(() => {
      setIsEditing(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    });
  };
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent sx={{ width: "300px", height: "200px" }}>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{vendor}</Typography>
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
        <Typography>ID: {id}</Typography>
          <div>
            {isEditing ? (
              <div>
                <TextField
                  type={id}
                  label="ID"
                  placeholder="id"
                  defaultValue={id}
                  inputProps={{ readOnly: true }}
                  sx={{ marginY: 1.5, maxWidth: "200px" }}
                />
                <TextField
                  type="text"
                  label="Title"
                  placeholder="title"
                  defaultValue={updatedTitle}
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  required
                  sx={{ marginY: 1.5, maxWidth: "200px" }}
                />
                <InputLabel>Category</InputLabel>
                <Select
                  value={updatedCategory}
                  label="Category"
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  required
                  sx={{ marginY: 1.5, maxWidth: "200px" }}
                >
                  <MenuItem value="Gadget">Gadget</MenuItem>
                  <MenuItem value="Widget">Widget</MenuItem>
                  <MenuItem value="Gizmo">Gizmo</MenuItem>
                  <MenuItem value="Doohickey">Doohickey</MenuItem>
                </Select>

                <TextField
                  type="text"
                  label="Vendor"
                  placeholder="vendor"
                  defaultValue={updatedVendor}
                  value={updatedVendor}
                  onChange={(e) => setUpdatedVendor(e.target.value)}
                  required
                  sx={{ marginY: 1.5, maxWidth: "200px" }}
                />
                <TextField
                  type="number"
                  label="Price"
                  placeholder="price"
                  defaultValue={updatedPrice}
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  required
                  sx={{ marginY: 1.5, maxWidth: "200px" }}
                />
                <TextField
                  type="number"
                  label="Rating"
                  placeholder="rating"
                  defaultValue={updatedRating}
                  value={updatedRating}
                  onChange={(e) => setUpdatedRating(e.target.value)}
                  required
                  sx={{ marginY: 1.5, maxWidth: "200px" }}
                />
                <Button
                  variant="contained"
                  size="medium"
                  onClick={handleSave}
                  sx={{ marginY: 1 }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="contained" size="small" onClick={handleEdit}>
                  <EditIcon/>
                </Button>
              </div>
            )}
          </div>

          {!isDeleted ? (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <div>
              <p style={{ color: "inherit" }}>
                Product with ID {id} has been successfully deleted.
              </p>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = ({ id, title, vendor, price, rating, category }) => {
  const { data, isLoading } = useQuery(GET_ALL_PRODUCTS);
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [isCreated, setIsCreated] = useState(false);

  const [newId, setNewId] = useState(id);
  const [newTitle, setNewTitle] = useState(title);
  const [newVendor, setNewVendor] = useState(vendor);
  const [newPrice, setNewPrice] = useState(price);
  const [newRating, setNewRating] = useState(rating);
  const [newCategory, setNewCategory] = useState(category);
  const [createProduct] = useMutation(CREATE_NEW_PRODUCT, {
    variables: { id },
    onCompleted: () => {
      setIsCreated(true);
    },
  });
  const handleAdd = () => {
    createProduct({
      variables: {
        productInput: {
          id: newId,
          title: newTitle,
          vendor: newVendor,
          price: parseFloat(newPrice),
          rating: parseFloat(newRating),
          category: newCategory,
        },
      },
    }).then(() => {
      setIsCreated(false);
    });
  };

  return (
    <Box m="1.5rem 2.5rem">
      {isCreated ? (
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
          <form onSubmit={handleAdd}>
            <Typography
              variant="h5"
              marginLeft={4}
              color={theme.palette.secondary[400]}
              gutterBottom
            >
              Add New Products
            </Typography>

            <TextField
              label="ID"
              type={newId}
              placeholder="Id"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              required
              sx={{ mt: 1, maxWidth: "250px" }}
            />
            <TextField
              label="Title"
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              sx={{ mt: 1, maxWidth: "250px" }}
            />
            <TextField
              label="Vendor"
              type="text"
              placeholder="Vendor"
              value={newVendor}
              onChange={(e) => setNewVendor(e.target.value)}
              required
              sx={{ mt: 1, maxWidth: "250px" }}
            />
            <TextField
              label="Price"
              type="number"
              step="0.10"
              placeholder="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
              sx={{ mt: 1, maxWidth: "250px" }}
            />
            <TextField
              label="Rating"
              type="number"
              step="0.10"
              placeholder="Rating"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              required
              sx={{ mt: 1, maxWidth: "250px" }}
            />
            <InputLabel>Category</InputLabel>

            <Select
              value={newCategory}
              label="Category"
              onChange={(e) => setNewCategory(e.target.value)}
              required
            
              sx={{ mt: 1, maxWidth: "250px" }}
            >
              <MenuItem value="Gadget">Gadget</MenuItem>
              <MenuItem value="Widget">Widget</MenuItem>
              <MenuItem value="Gizmo">Gizmo</MenuItem>
              <MenuItem value="Doohickey">Doohickey</MenuItem>
            </Select>

            <Button  sx={{ mt: 2 }} type="submit" variant="contained" size="large">
              Save
            </Button>
          </form>
        </Box>
      ) : (
        <div>
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsCreated(true)}
          >
            Add
          </Button>
          <Header title="PRODUCTS" subtitle="See your list of products." />
          {data && !isLoading ? (
            <Box
              mt="20px"
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              justifyContent="space-between"
              rowGap="20px"
              columnGap="1.33%"
              
            >
              {Array.isArray(data.products) &&
                data.products.map(
                  ({ id, vendor, title, price, rating, category }) => (
                    <Product
                      key={id}
                      id={id}
                      title={title}
                      price={price}
                      rating={rating}
                      category={category}
                      vendor={vendor}
                    />
                  )
                )}
            </Box>
          ) : (
            <>Loading...</>
          )}
        </div>
      )}
    </Box>
  );
};

export default Products;
