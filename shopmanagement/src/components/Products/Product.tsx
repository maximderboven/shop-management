import { Product as ProductModel } from "../../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, CardMedia, CircularProgress, Fab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { getColor } from "../../utils/colorgrading";
import { Properties } from "./properties/Properties";
import { Price } from "./properties/Price";
import { Stock } from "./properties/Stock";

export function Product() {
  const { id } = useParams();
  const { isLoading, isError, product } = useProduct(id!);
  if (isLoading) {
    return <CircularProgress />;
  } else if (!product) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isError) {
    return <Alert severity="error">Product could not be loaded</Alert>;
  } else {
    return (
      <div>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={5}>
            {/* Main content */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <p key={product.id}>{product.description}</p>
              <Price product={product} />
              <Box
                component="img"
                sx={{
                  pt: 2,
                  maxHeight: { xs: 333, md: 267 },
                  maxWidth: { xs: 450, md: 350 },
                }}
                alt={product.name}
                src={product.image}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Properties />
            </Grid>
            <Grid item xs={12} md={10}>
            <Stock product={product} />
            </Grid>
            {/* End sidebar */}
          </Grid>
        </Container>
      </div>
    );
  }
}
