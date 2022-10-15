import { Product as ProductModel } from "../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import {Alert, CircularProgress, Fab} from "@mui/material";
import {useParams} from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useState } from "react";

export function Product() {
  const {id} = useParams();
  const {isLoading, isError, product} = useProduct(id!);
  if (isLoading) {
    return <CircularProgress />;
  } else 
  if (!product) {
    return <Alert severity="error">Product does not exist</Alert>;
   } else if (isError) {
    return <Alert severity="error">Product could not be loaded</Alert>;
  } else {
    return (
      <div>
        <h1>Product</h1>
        <ul>
          <li>
            {product.name} - {product.price}
          </li>
        </ul>
      </div>
    );
  }
};
