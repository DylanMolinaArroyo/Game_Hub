import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError, AxiosRequestConfig } from "axios";


interface FetchResponse<T> {
    count: number;
    results: T[];
    next?: string;  
    previous?: string;  
 }
 
 const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [nextPage, setNextPage] = useState<string | null>(null); 
    useEffect(() => {
        const controller = new AbortController();
    
        setLoading(true);
    
        
        if (requestConfig?.params?.page) {
            setData([]); 
        }
    
        apiClient
            .get<FetchResponse<T>>(nextPage ?? endpoint, { signal: controller.signal, ...requestConfig })
            .then((res) => {
                setData(res.data.results); 
                setTotalPages(Math.ceil(res.data.count / (requestConfig?.params?.page_size ?? 20)));
                setNextPage(res.data.next ?? null);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
    
        return () => controller.abort();
    }, deps ? [...deps] : []);

    return { data, error, isLoading, totalPages };
};


export default useData;
