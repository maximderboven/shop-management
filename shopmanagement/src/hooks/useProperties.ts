import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProperties,
  getProductProperties,
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
  return {
    isLoadingProductProperties: isLoading,
    isErrorProductProperties: isError,
    productProperties,
  };
}
