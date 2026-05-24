
import "./CreateOrder.css";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import api from "../../common/api";

import "./CreateOrder.css";

function CreateOrder() {

  const location = useLocation();

  const navigate = useNavigate();

  const { product, quantity } =
    location.state || {};

  const [activeStep, setActiveStep] =
    useState(0);

  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState("");

  const [addressForm, setAddressForm] =
    useState({
      name: "",
      contactNumber: "",
      city: "",
      landmark: "",
      street: "",
      state: "",
      zipcode: "",
    });

  useEffect(() => {

    loadAddresses();

  }, []);

  const loadAddresses = async () => {

    const response =
      await api.get("/addresses");

    setAddresses(response.data);
  };

  const createAddress = async () => {

    await api.post(
      "/addresses",
      addressForm
    );

    alert("Address added");

    loadAddresses();
  };

  const placeOrder = async () => {

    await api.post("/orders", {
      quantity,
      product: product.id,
      address: selectedAddress,
    });

    alert("Order placed successfully");

    navigate("/products");
  };

  return (
    <div className="order-container">

      <Stepper activeStep={activeStep}>

        <Step>
          <StepLabel>Items</StepLabel>
        </Step>

        <Step>
          <StepLabel>Select Address</StepLabel>
        </Step>

        <Step>
          <StepLabel>Confirm Order</StepLabel>
        </Step>

      </Stepper>

      {activeStep === 0 && (

        <Card sx={{ mt: 3 }}>

          <CardContent>

            <Typography variant="h5">
              {product?.name}
            </Typography>

            <Typography>
              Quantity: {quantity}
            </Typography>

            <Typography>
              Total Price:
              ₹ {product?.price * quantity}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setActiveStep(1)}
            >
              NEXT
            </Button>

          </CardContent>

        </Card>
      )}

      {activeStep === 1 && (

        <Grid container spacing={3} sx={{ mt: 2 }}>

          <Grid item xs={12} md={6}>

            <Typography variant="h6">
              Select Address
            </Typography>

            {addresses.map((address) => (

              <Card
                key={address.id}
                sx={{
                  mt: 2,
                  border:
                    selectedAddress === address.id
                      ? "2px solid blue"
                      : "",
                }}
                onClick={() =>
                  setSelectedAddress(address.id)
                }
              >

                <CardContent>

                  <Typography>
                    {address.name}
                  </Typography>

                  <Typography>
                    {address.street}
                  </Typography>

                  <Typography>
                    {address.city}
                  </Typography>

                </CardContent>

              </Card>
            ))}

          </Grid>

          <Grid item xs={12} md={6}>

            <Typography variant="h6">
              Add Address
            </Typography>

            {Object.keys(addressForm).map(
              (field) => (

                <TextField
                  key={field}
                  label={field}
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      [field]:
                        e.target.value,
                    })
                  }
                />
              )
            )}

            <Button
              variant="contained"
              onClick={createAddress}
            >
              SAVE ADDRESS
            </Button>

          </Grid>

          <Grid item xs={12}>

            <Button
              variant="outlined"
              onClick={() => setActiveStep(0)}
            >
              BACK
            </Button>

            <Button
              variant="contained"
              sx={{ ml: 2 }}
              disabled={!selectedAddress}
              onClick={() => setActiveStep(2)}
            >
              NEXT
            </Button>

          </Grid>

        </Grid>
      )}

      {activeStep === 2 && (

        <Card sx={{ mt: 3 }}>

          <CardContent>

            <Typography variant="h5">
              Confirm Order
            </Typography>

            <Typography>
              Product: {product?.name}
            </Typography>

            <Typography>
              Quantity: {quantity}
            </Typography>

            <Typography>
              Total:
              ₹ {product?.price * quantity}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setActiveStep(1)}
            >
              BACK
            </Button>

            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={placeOrder}
            >
              CONFIRM ORDER
            </Button>

          </CardContent>

        </Card>
      )}

    </div>
  );
}

export default CreateOrder;