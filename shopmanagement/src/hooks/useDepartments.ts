import { useQuery, useQueryClient} from "@tanstack/react-query";
import { getDepartments, getDepartment } from "../services/DepartmentDataService";

export function useDepartments() {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: departments,
    } = useQuery(["departments"], () => getDepartments());

    return {
        isLoadingDepartments: isLoading,
        isErrorDepartments: isError,
        departments,
    };
}

export function useDepartmentWithId(id: string) {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: department,
    } = useQuery(["department", id], () => getDepartment(id));

    return {
        isLoadingDepartmentWithId:isLoading,
        isErrorDepartmentWithId: isError,
        department,
    };
}
