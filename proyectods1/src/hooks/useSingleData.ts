import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<GameProfile> {
    count: number;
    results: GameProfile;
 }

const useSingleData = <GameProfile>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
    deps?: any[]
  ) => {
    const [data, setData] = useState<GameProfile | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();
  
      setLoading(true);
      apiClient
        .get<FetchResponse<GameProfile>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results || null); // Obtener solo el primer objeto
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
  
      return () => controller.abort();
    }, deps ? [...deps] : []);
  
    return { data, error, isLoading };
  };
  
  export default useSingleData;
  