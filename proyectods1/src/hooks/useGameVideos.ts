import { useEffect, useState } from "react";
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

const useGameVideos = (gameId: number, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<Trailer[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<{ results: Trailer[] }>(`/games/${gameId}/movies?lang=en`, {
        signal: controller.signal,
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

    return () => controller.abort();
  }, [gameId, requestConfig]);

  return { data, error, isLoading };
};

export default useGameVideos;
