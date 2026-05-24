import { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Chip,
  Box,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar
from "../navbar/Navbar";

import api from "../../common/api";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState({});

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct = async () => {

    try {

      const response =
        await api.get(`/products/${id}`);

      setProduct(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const placeOrder = () => {

    navigate("/order", {
      state: {
        product,
        quantity,
      },
    });
  };

  return (
    <>

      <Navbar />

      <div className="details-container">

        <Grid
          container
          spacing={6}
          alignItems="center"
        >

          <Grid item xs={12} md={5}>

            <img
              src={
                product.imageUrl ||
                "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="details-image"
            />

          </Grid>

          <Grid item xs={12} md={7}>

            <Box className="details-header">

              <Typography
                variant="h3"
              >
                {product.name}
              </Typography>

              <Chip
                label={`Available Quantity : ${product.availableItems}`}
                color="primary"
                className="quantity-chip"
              />

            </Box>

            <Typography
              className="category-text"
            >
              Category:
              <b>
                {" "}
                {product.category}
              </b>
            </Typography>

            <Typography
              className="description-text"
            >
              {product.description}
            </Typography>

            <Typography
              className="price-text"
            >
              ₹ {product.price}
            </Typography>

            <TextField
              label="Enter Quantity *"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
              className="quantity-field"
            />

            <br />

            <Button
              variant="contained"
              onClick={placeOrder}
            >
              PLACE ORDER
            </Button>

          </Grid>

        </Grid>

      </div>

    </>
  );
}

export default ProductDetails;