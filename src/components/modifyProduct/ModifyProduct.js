
import "./ModifyProduct.css";

import { useEffect, useState } from "react";

import {
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";

import { useParams } from "react-router-dom";

import api from "../../common/api";

function ModifyProduct() {

  const { id } = useParams();

  const [form, setForm] = useState({});

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct = async () => {

    const response =
      await api.get(`/products/${id}`);

    setForm(response.data);
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const updateProduct = async () => {

    await api.put(
      `/products/${id}`,
      form
    );

    alert("Product updated");
  };

  return (
    <Card
      sx={{
        width: 500,
        margin: "20px auto",
        padding: 4,
      }}
    >

      <Typography variant="h5">
        Modify Product
      </Typography>

      {Object.keys(form).map((field) => (

        field !== "id" && (

          <TextField
            key={field}
            label={field}
            name={field}
            fullWidth
            margin="normal"
            value={form[field]}
            onChange={handleChange}
          />
        )
      ))}

      <Button
        variant="contained"
        fullWidth
        onClick={updateProduct}
      >
        MODIFY PRODUCT
      </Button>

    </Card>
  );
}

export default ModifyProduct;