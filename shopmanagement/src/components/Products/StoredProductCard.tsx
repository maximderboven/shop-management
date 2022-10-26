import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ShelfProduct } from "../../model/ShelfProduct";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../model/Product";
import { useProducts } from "../../hooks/useProducts";
import { Alert, CircularProgress } from "@mui/material";
import { getColor } from "../../utils/colorgrading";

export function StoredProductCard({
  storedproduct,
}: {
  storedproduct: ShelfProduct;
}) {
  const { isLoadingProducts, isErrorProducts, products } = useProducts();
  if (isLoadingProducts) {
    return <CircularProgress />;
  } else if (!products) {
    return <Alert severity="error">Product does not exist</Alert>;
  } else if (isErrorProducts) {
    return <Alert severity="error">Product could not be loaded</Alert>;
  } else {
    return (
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        {products.map((product) => {
          if (product.id === storedproduct.productId) {
            return (
              <CardActionArea href={`/products/${product.id}`} key={product.id}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography
                    sx={{
                      pt: 6,
                      fontWeight: "bold",
                    }}
                    variant="body2"
                    color={getColor(1-storedproduct.quantity/storedproduct.MaxQuantity)}
                  >
                    STOCK: {storedproduct.quantity} /{" "}
                    {storedproduct.MaxQuantity}
                  </Typography>
                </CardContent>
              </CardActionArea>
            );
          }
        })}
      </Card>
    );
  }
}
