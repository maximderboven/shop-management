import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {editProduct, addProduct, getProduct, removeProduct} from "../services/ProductDataService";
import {Product} from "../model/Product";


export function useProduct(productId: string) {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: product,
    } = useQuery(["product"], () => getProduct(productId));

    const {
        mutate: addProductMutation,
        isLoading: isAddingProduct,
        isError: isErrorAddingProduct,
    } = useMutation(
        (product: Omit<Product, "id">) => addProduct(product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["product"]);
            },
        }
    );

    const {
        mutate: editProductMutation,
        isLoading: isEditingProduct,
        isError: isErrorEditingProduct,
    } = useMutation(
        (product: Omit<Product, number>) => editProduct(product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["product"]);
            },
        }
    );

    const {
        mutate: removeProductMutation,
        isLoading: isRemovingProduct,
        isError: isErrorRemovingProduct,
    } = useMutation(
        () => removeProduct(productId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["product"]);
            },
        }
    );

    return {
        isLoading,
        isError,
        product,
        addProductMutation: addProductMutation,
        isAddingProduct,
        isErrorAddingProduct,
        editProductMutation: editProductMutation,
        isEditingProduct,
        isErrorEditingProduct,
        removeProductMutation: removeProductMutation,
        isRemovingProduct,
        isErrorRemovingProduct
    };

}
