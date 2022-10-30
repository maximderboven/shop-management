import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductProperty, ProductPropertyItem } from "../model/ProductProperty";
import {
  getProperties,
  getProductProperties,
  deleteProductProperty,
  createProductProperty,
} from "../services/PropertyDataService";

export function useProperties() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: properties,
  } = useQuery(["properties"], () => getProperties());

  return {
    isLoading,
    isError,
    properties,
  };
}

export function useProductProperties(productId: string) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: productProperties,
  } = useQuery(["productproperties", productId], () =>
    getProductProperties(productId)
  );

  const {
    mutate: deleteProductPropertyMutation,
    isLoading: isDeletingProductProperty,
    isError: isDeletingProductPropertyError,
  } = useMutation(
    (productPropertyId: number) => deleteProductProperty(productPropertyId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["productproperties"]);
      },
    }
  );

  const {
    mutate: addProductPropertyMutation,
    isLoading: isAddingProductProperty,
    isError: isAddingProductPropertyError,
  } = useMutation(
    (productProperty: ProductPropertyItem) => createProductProperty(productProperty),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["productproperties"]);
      },
    }
  );

  return {
    isLoading,
    isError,
    productProperties,
    deleteProductPropertyMutation,
    isDeletingProductProperty,
    isDeletingProductPropertyError,
    addProductPropertyMutation,
    isAddingProductProperty,
    isAddingProductPropertyError,
  };
}
