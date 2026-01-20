import { useState, useCallback } from "react";
import apiClient from "../services/api-client";
import { CanceledError, AxiosRequestConfig } from "axios";

export interface GameImage {
  image: string;
  hidden: boolean;
}

type RefetchFunction = () => Promise<void>;

const useGameImages = (gameId: number, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<GameImage[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    return apiClient
      .get<{ results: GameImage[] }>(`/games/${gameId}/screenshots`, {
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

export default useGameImages;
