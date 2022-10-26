import { Product } from "../../model/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function EditProduct() {
    const [loading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<Error | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

    return (
        <div>
            <h1>Edit Product</h1>
        </div>
    );
};