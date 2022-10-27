import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShelfProduct } from "../model/ShelfProduct";
import {
  getStoredProductsOnShelfs,
  getStoredProductOnShelf,
  getStoredProductsFromProducts,
  getStoredProductsFromProduct,
  getStoredProducts,
  storeProduct,
  deleteStoredProduct
} from "../services/ProductDataService";

export const useStoredProductsFromShelf = (shelfId: number) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery(["products", shelfId], () => getStoredProductOnShelf(shelfId));
  return {
    isLoading,
    isError,
    products,
  };
};

export const useStoredProductsFromShelfs = (shelfIds: number[]) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery(["products", shelfIds.join(",")], () =>
    getStoredProductsOnShelfs(shelfIds)
  );
  return {
    isLoadingStoredProductsFromShelfs: isLoading,
    isErrorStoredProductsFromShelfs: isError,
    storedproductsfromshelfs: products,
  };
};

export const useStoredProductsFromProducts = (productIds: number[]) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery(["products", productIds.join(",")], () =>
    getStoredProductsFromProducts(productIds)
  );
  return {
    isLoading,
    isError,
    products,
  };
};

export const useStoredProductsFromProduct = (productId: number) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: storedproducts,
  } = useQuery(["products", productId], () =>
    getStoredProductsFromProduct(productId)
  );
  return {
    isLoading,
    isError,
    storedproducts,
  };
}

export const useStoredProducts = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingStoredProducts,
    isError,
    data: products,
  } = useQuery(["products"], () => getStoredProducts());

  const {
    mutate: storeProductMutation,
    isLoading: isStoringProduct,
    isError: isErrorStoringProduct,
} = useMutation(
    (shelfproduct: Omit<ShelfProduct, "id">) => storeProduct(shelfproduct),
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    }
);

    const {
      mutate : deleteProductMutation,
      isLoading: isDeletingStoredProduct,
      isError: isErrorDeletingStoredProduct,
    } = useMutation(
      (shelfproductid:number) => deleteStoredProduct(shelfproductid),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["products"]);
        },
      }
    );

  return {
    isLoadingStoredProducts,
    isErrorStoredProducts: isError,
    storedproducts:products,
    storeProductMutation: storeProductMutation,
    isStoringProduct,
    isErrorStoringProduct,
    deleteProductMutation: deleteProductMutation,
    isDeletingStoredProduct,
    isErrorDeletingStoredProduct,

  };

  
}