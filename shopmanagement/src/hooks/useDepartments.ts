import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getDepartments } from "../services/DepartmentDataService";

export function useDepartments() {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: departments,
    } = useQuery(["departments"], () => getDepartments());

    return {
        isLoading,
        isError,
        departments,
    };
}
