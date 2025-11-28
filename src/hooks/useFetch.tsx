import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    const getDataUrl = async () => {
      if (!url) return;
      setLoading(true);

      try {
        const res = await fetch(url, { signal });

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }
        const datajson = await res.json();

        setData(datajson);
      } catch (err) {
        const error = err as Error
        if (error.name === "AbortError") return;
        setError(error.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    getDataUrl();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
