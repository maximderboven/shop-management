import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function CreateProduct() {
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

    return (
        <div>
            <h1>New Product</h1>
        
        </div>
    );
};