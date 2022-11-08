import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShelfProduct } from "../model/ShelfProduct";
import {
  getStoredProductsFromProduct,
  getStoredProducts,
  storeProduct,
  deleteStoredProduct,
  updateStoredProduct,
} from "../services/ProductDataService";

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

    const {
      mutate : editStoredProductMutation,
      isLoading: isEditingStoredProduct,
      isError: isErrorEditingStoredProduct,
    } = useMutation(
      (shelfproduct: ShelfProduct) => updateStoredProduct(shelfproduct),
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
    editStoredProductMutation: editStoredProductMutation,
    isEditingStoredProduct,
    isErrorEditingStoredProduct,
  };
}