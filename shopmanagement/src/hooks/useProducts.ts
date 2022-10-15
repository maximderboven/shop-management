import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Product} from "../model/Product";
import {getProducts} from "../services/ProductDataService";

export function useProducts() {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: products,
    } = useQuery(["items"], () => getProducts());

    return {
        isLoading,
        isError,
        products,
    };
}
