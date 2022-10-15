import { Product as ProductModel } from "../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useState } from "react";

export function Product() {
  const {id} = useParams();
  const {isLoading, isError, product} = useProduct(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Dikke error</div>;
  }

    if (product == null) {
        return <div>Product not found</div>;
    }

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
};
