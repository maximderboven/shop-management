import { Product } from "../../model/Product";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import "./css/products.css";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useContext } from "react";
import UserContext, { IUserContext } from "../../context/UserContext";
import { Role } from "../../model/Role";

export function Products() {
  const { isLoadingProducts, isErrorProducts, products, setIsPromo, isPromo } = useProducts();
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);

  const searchProducts = (e: any) => {
    const search = e.target.value;
    setSearch(search);
  };

  const inPromoOfNietChange = (e: any) => {
    setIsPromo(e.target.checked);
  };

  if (isLoadingProducts) {
    return <CircularProgress />;
  }

  if (isErrorProducts || products == null) {
    return <Alert severity="error">Error loading products</Alert>;
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
              flexWrap: 'wrap',
              justifyContent: "space-between",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <FormGroup>
              <FormControlLabel
              sx={{alignItems: 'center', height: '100%'}}
                control={<Checkbox checked={isPromo}/>}
                label="Show Discount"
                onChange={inPromoOfNietChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
              sx={{alignItems: 'center', height: '100%'}}
                control={<SwapVertIcon />}
                label="Order by Discount"
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
        <Grid container spacing={4} alignItems="stretch">
          {loggedIn && role === Role.Admin && (
            <Grid
              item
              key="add"
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Paper elevation={1} sx={{ height: "100%" }}>
                <Box
                  m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: 300 }}
                >
                  <Button variant="contained" href="/products/create">
                    <AddIcon />
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}

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
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
