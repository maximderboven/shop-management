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

export function Price({ product }: { product: ProductModel }) {
  if (!product.discount) {
    return (
      <Typography variant="h6" gutterBottom>
        €{product.price}
      </Typography>
    );
  } else {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          <p>
            <span style={{ color: "red", textDecoration: "line-through" }}>
              €{product.price}
            </span>{" "}
            €
            {product.discount
              ? product.price -
                product.price * (product.discountPercentage / 100)
              : product.price}
          </p>
        </Typography>
      </div>
    );
  }
}
