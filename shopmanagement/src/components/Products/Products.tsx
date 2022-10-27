import { Product } from "../../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import "../css/products.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Search } from "@mui/icons-material";
import { Checkbox, FormControlLabel, FormGroup, Input } from "@mui/material";
import "./css/products.css";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export function Products() {
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);

  const searchProducts = (e: any) => {
    const search = e.target.value;
    setSearch(search);
  };

  if (isLoadingProducts) {
    return <div>Loading...</div>;
  }

  if (isErrorProducts || products == null) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
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
        <div className="topnav">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <FormGroup
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <FormControlLabel
                control={<SwapVertIcon />}
                label="Toon Discount"
                onClick={() => setSort(!sort)}
              />
            </FormGroup>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search.."
                name="search"
                onChange={searchProducts}
              ></input>
            </div>
          </Box>
        </div>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {products
            .sort((a, b) =>
              sort
                ? Number(a.discount) - Number(b.discount)
                : Number(b.discount) - Number(a.discount)
            )
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product: Product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
