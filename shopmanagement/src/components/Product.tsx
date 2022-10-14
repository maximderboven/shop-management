import { useState } from "react";
import { Product as ProductModel } from "../model/Product";

export function Product() {
  const [loading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [error, setError] = useState<Error | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
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
