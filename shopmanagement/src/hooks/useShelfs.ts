import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getShelfs,
  getShelfsFromDepartment,
  getShelfsFromDepartments,
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

export function useShelfsFromDepartments(departments: number[]) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    ["shelfs", departments.join(",")],
    () => getShelfsFromDepartments(departments)
  );
  return {
    shelfs: data,
    isLoading,
    error,
  };
}
