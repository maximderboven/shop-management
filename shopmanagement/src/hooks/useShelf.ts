import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getShelfs} from "../services/ShelfDataService";

export function useLocations() {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: locations,
    } = useQuery(["locations"], () => getShelfs());

    return {
        isLoading,
        isError,
        locations,
    };
}
