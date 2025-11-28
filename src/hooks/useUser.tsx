import { useMemo } from "react";
import { useFetch } from "./useFetch";

const API = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export function useUsers(filter: string) {
  const { data, error, loading } = useFetch<User[]>(API);

  const filterdUsers = useMemo(() => {
    if (!data) return [];
    const query = filter.trim().toLowerCase();
    if (!query) return data;
    return data.filter((u) => u.name.toLowerCase().includes(query));
  }, [data, filter]);

  return { data: filterdUsers, loading, error };
}
