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

    const {
        mutate: deleteProductMutation,
        isLoading: isDeletingProduct,
        isError: isDeletingProductError,
    } = useMutation(
        (productId:number) => deleteProduct(productId),
        {
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });

    const {
        mutate: updateProductMutation,
        isLoading: isUpdatingProduct,
        isError: isUpdatingProductError,
    } = useMutation(
        (product:Product) => updateProduct(product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"]);
            },
        });

    const {
        mutate: createProductMutation,
        isLoading: isCreatingProduct,
        isError: isCreatingProductError,
    } = useMutation(
        (product:Product) => createProduct(product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"]);
            },
        });

    return {
        isLoading,
        isError,
        product,
        deleteProductMutation,
        isDeletingProduct,
        isDeletingProductError,
        updateProductMutation,
        isUpdatingProduct,
        isUpdatingProductError,
        createProductMutation,
        isCreatingProduct,
        isCreatingProductError,
    };
}

export function useAddProduct() {
    const queryClient = useQueryClient();
    const {mutateAsync, isLoading, isError} = useMutation(
        (product: Omit<Product,"id">) => createProduct(product),
        {
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });

    return {
        storeProductMutation: mutateAsync,
        isLoading,
        isError,
    };
}