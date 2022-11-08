import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getShelfs,
  getShelfsFromDepartment,
} from "../services/ShelfDataService";

export function useShelfs() {
  const queryClient = useQueryClient();
  const { data, isLoading:isLoadingShelfs, error:isErrorShelfs } = useQuery(["shelfs"], () => getShelfs());
  return {
    shelfs: data,
    isLoadingShelfs,
    isErrorShelfs,
  };
}

export function useShelfsFromDepartment(departmentId: string) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(["shelfs", departmentId], () =>
    getShelfsFromDepartment(departmentId)
  );
  return {
    shelfs: data,
    isLoadingShelfsFromDepartment: isLoading,
    isErrorShelfsFromDepartment: error,
  };
}