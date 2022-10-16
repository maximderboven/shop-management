import { Product } from "../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import "./css/products.css";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function Products() {
  const {isLoading, isError, products} = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || products == null) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Products
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
            {products.map((product: Product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
        </Grid>
        </Container>
    </div>
    );
};