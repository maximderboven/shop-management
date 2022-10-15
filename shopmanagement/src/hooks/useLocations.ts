import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Location} from "../model/Location";
import {getLocations} from "../services/LocationDataService";

export function useLocations() {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: locations,
    } = useQuery(["locations"], () => getLocations());

    return {
        isLoading,
        isError,
        locations,
    };
}
