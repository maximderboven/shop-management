import { useQuery, useQueryClient} from "@tanstack/react-query";
import {getProducts} from "../services/ProductDataService";
import { useState} from "react";

export function useProducts() {
    const [isPromo, setIsPromo] = useState(false);
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: products,
    } = useQuery([isPromo ? "items" : "itemsfilter"], () => getProducts(isPromo));

    return {
        isLoadingProducts: isLoading,
        isErrorProducts: isError,
        products,
        setIsPromo,
        isPromo,
    };
}