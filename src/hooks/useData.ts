import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError, AxiosRequestConfig } from "axios";


interface FetchResponse<T> {
    count: number;
    results: T[];
 }

 const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
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
                setData(res.data.results);
                setTotalPages(Math.ceil(res.data.count / (requestConfig?.params?.page_size ?? 20)));
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, deps ?? []);

    return { data, error, isLoading, totalPages };
};


export default useData;
