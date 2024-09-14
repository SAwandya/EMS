import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/api-client";

const apiClient = new APIClient("/employee");

const useEmployee = () =>
  useQuery({
    queryKey: ["employee"],
    queryFn: () => apiClient.getAll(),
    staleTime: 24 * 60 * 60 * 1000, //24h
  });

export default useEmployee;
