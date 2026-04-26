import { useEffect, useState } from "react";
import apiClient, { RequestConfig } from "../services/api-client";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: RequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setData([]);

    apiClient
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => {
        setData(res.results);
        setTotalPages(Math.ceil(res.count / ((requestConfig?.params?.page_size as number) ?? 20)));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, deps ?? []);

  return { data, error, isLoading, totalPages };
};

export default useData;
