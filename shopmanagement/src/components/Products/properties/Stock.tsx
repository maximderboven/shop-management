import { Product as ProductModel } from "../../../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, CardMedia, CircularProgress, Fab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useStoredProductsFromProduct } from "../../../hooks/useStoredProducts";

export function Stock({ product }: { product: ProductModel }) {
  const { isLoading, isError, storedproducts } = useStoredProductsFromProduct(
    product.id
  );
  if (isLoading) {
    return <CircularProgress />;
  } else if (!storedproducts) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isError) {
    return <Alert severity="error">Property could not be loaded</Alert>;
  } else {
    return (
      <div>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Stock
          </Typography>
          <Divider />
          <Typography variant="h6" gutterBottom>
            {storedproducts.map((storedproduct) => (
              <div>
                <Typography variant="body1" gutterBottom>
                 {storedproduct.quantity} / {storedproduct.MaxQuantity}
                </Typography>
              </div>
            ))}
          </Typography>
        </Paper>
      </div>
    );
  }
}
