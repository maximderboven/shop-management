import { Product } from "../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";

export function Products() {
  const {isLoading, isError, items} = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || items == null) {
    return <div>Error</div>;
  }

  return (
    <div>
        <h1>Products</h1>
        <ul>
            {items.map((product: Product) => (
                <li key={product.id}>
                    {product.name} - {product.price}
                </li>
            ))}
        </ul>
    </div>
    );
};