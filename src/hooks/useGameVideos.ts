import { useState, useCallback } from "react";
import apiClient from "../services/api-client";
import { CanceledError, AxiosRequestConfig } from "axios";

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    max: string;
  };
}

type RefetchFunction = () => Promise<void>;

const useGameVideos = (gameId: number, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<Trailer[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    return apiClient
      .get<{ results: Trailer[] }>(`/games/${gameId}/movies`, {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  }, [gameId, requestConfig]);

  const refetch: RefetchFunction = () => fetchData();

  return { data, error, isLoading, refetch };
};

export default useGameVideos;
