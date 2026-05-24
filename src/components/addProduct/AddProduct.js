
import "./AddProduct.css";

import { useState } from "react";

import {
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";

import CreatableSelect
from "react-select/creatable";

import api from "../../common/api";

import "./AddProduct.css";

function AddProduct() {

  const [category, setCategory] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    availableItems: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const addProduct = async () => {

    await api.post("/products", {
      ...form,
      category: category?.value,
    });

    alert(
      `Product ${form.name} added`
    );
  };

  return (
    <Card className="product-form">

      <Typography variant="h5">
        Add Product
      </Typography>

      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <CreatableSelect
        options={[]}
        onChange={setCategory}
      />

      <TextField
        label="Manufacturer"
        name="manufacturer"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Available Items"
        name="availableItems"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Price"
        name="price"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Image URL"
        name="imageUrl"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={addProduct}
      >
        ADD PRODUCT
      </Button>

    </Card>
  );
}

export default AddProduct;