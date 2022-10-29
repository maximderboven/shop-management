import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UserContext, { IUserContext } from "../../context/UserContext";
import { Role } from "../../model/Role";
import { useContext } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ProductItem } from "../../model/Product";
import { createProduct } from "../../services/ProductDataService";
import { useAddProduct, useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../hooks/useProperties";

const REQUIRED_FIELDMESSAGE = "This field is required";
const MIN_LENGTHMESSAGE = (length: number) =>
  `Please enter minimum ${length} characters.`;

export function CreateProduct() {
  const { storeProductMutation, isLoading, isError } = useAddProduct();
  const { isLoading:isLoadingProperties, isError:isErrorloadingProperties, properties } = useProperties();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();

  const addProduct = (data: ProductItem) => {
    storeProductMutation({ ...data });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      discount: false,
      discountPercentage: 0,
    },
  });

  const _onSubmit = (data: ProductItem) => {
    addProduct(data);
    reset();
    setIsSuccessful(true);
    // navigate('/products');
  };

  if (loggedIn && role === Role.Admin) {
    return (
      <>
        <Box sx={{ maxWidth: 600, mx: "auto", mt: "2rem" }}>
          <form onSubmit={handleSubmit(_onSubmit)}>
            <Typography variant="h4">Create Product</Typography>
            <Grid style={{ display: "flex", flexDirection: "column" }}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: REQUIRED_FIELDMESSAGE,
                  minLength: {
                    value: 3,
                    message: MIN_LENGTHMESSAGE(3),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: "1rem" }}
                    {...field}
                    label="Name"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: REQUIRED_FIELDMESSAGE,
                  minLength: {
                    value: 10,
                    message: MIN_LENGTHMESSAGE(10),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: "1rem" }}
                    {...field}
                    label="Description"
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{
                  required: REQUIRED_FIELDMESSAGE,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: "1rem" }}
                    {...field}
                    label="Price"
                    variant="outlined"
                    type="number"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="image"
                control={control}
                rules={{
                  required: REQUIRED_FIELDMESSAGE,
                  pattern: {
                    value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                    message: "Please enter a valid image url",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: "1rem" }}
                    {...field}
                    label="Image"
                    variant="outlined"
                    error={!!errors.image}
                    helperText={errors.image?.message}
                  />
                )}
              />
              <Controller
                name="discount"
                control={control}
                render={({ field }) => <Switch {...field} color="primary" />}
              />
              <Controller
                name="discountPercentage"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: REQUIRED_FIELDMESSAGE,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: "1rem" }}
                    {...field}
                    type="number"
                    label="Discount Percentage"
                    variant="outlined"
                    error={!!errors.discountPercentage}
                    helperText={errors.discountPercentage?.message}
                  />
                )}
              />
              {/* {properties && properties.map((property) => (
                    <TextField
                      sx={{ mt: "1rem" }}
                      placeholder={property.name}
                      type="text"
                      label={property.name}
                      variant="outlined"
                    />
              ))} */}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: "1rem" }}
              >
                Create Product
              </Button>
              {isSuccessful && !isLoading && !isError && (
                <>
                  <Alert sx={{ mt: "1rem" }} severity="success">
                    Product created successfully{" "}
                  </Alert>
                  <Button
                    sx={{ mt: "1rem" }}
                    variant="contained"
                    color="success"
                    onClick={() => navigate("/products")}
                  >
                    Go to Products
                  </Button>
                </>
              )}
              {isError && (
                <Alert severity="error" sx={{ mt: "1rem" }}>
                  Error creating product
                </Alert>
              )}
              {isLoading && (
                <Alert severity="info" sx={{ mt: "1rem" }}>
                  Creating product...
                </Alert>
              )}
            </Grid>
          </form>
        </Box>
      </>
    );
  } else {
    // return <Redirect to="/login" />;
    return (
      <Alert severity="error">You are not authorized to view this page</Alert>
    );
  }
}
