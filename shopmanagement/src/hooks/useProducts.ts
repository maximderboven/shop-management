import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Product} from "../model/Product";
import {getProducts} from "../services/ProductDataService";
import {useEffect, useState} from "react";

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