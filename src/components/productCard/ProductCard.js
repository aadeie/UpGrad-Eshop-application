import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";

import DeleteIcon
from "@mui/icons-material/Delete";

import EditIcon
from "@mui/icons-material/Edit";

import { useNavigate }
from "react-router-dom";

import api from "../../common/api";

import "./ProductCard.css";

function ProductCard({ product, reload }) {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const deleteProduct = async () => {

    const confirmDelete =
      window.confirm(
        `Delete ${product.name}?`
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/products/${product.id}`
      );

      alert(
        `Product deleted successfully`
      );

      reload();

    } catch (error) {

      alert("Delete failed");
    }
  };

  return (
    <Card className="product-card">

      <CardMedia
        component="img"
        image={
          product.imageUrl ||
          "https://via.placeholder.com/300"
        }
        alt={product.name}
        className="product-image"
      />

      <CardContent className="product-content">

        <Box className="product-header">

          <Typography
            variant="h5"
            className="product-name"
          >
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            className="product-price"
          >
            ₹ {product.price}
          </Typography>

        </Box>

        <Typography
          variant="body1"
          className="product-description"
        >
          {product.description}
        </Typography>

        <Box className="product-footer">

          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/products/${product.id}`
              )
            }
          >
            BUY
          </Button>

          {role === "ADMIN" && (

            <Box>

              <IconButton
                color="primary"
                onClick={() =>
                  navigate(
                    `/modify-product/${product.id}`
                  )
                }
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={deleteProduct}
              >
                <DeleteIcon />
              </IconButton>

            </Box>
          )}

        </Box>

      </CardContent>

    </Card>
  );
}

export default ProductCard;