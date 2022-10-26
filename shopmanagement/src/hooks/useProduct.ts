import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProduct, deleteProduct, updateProduct, createProduct} from "../services/ProductDataService";
import {Product} from "../model/Product";


export function useProduct(productId: string) {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: product,
    } = useQuery(["product"], () => getProduct(productId));

    return {
        isLoading,
        isError,
        product,
    };

}
