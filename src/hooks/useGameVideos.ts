import { useState, useCallback, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    max: string;
  };
}

const useGameVideos = (gameId: number) => {
  const [data, setData] = useState<Trailer[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    return apiClient
      .get<{ results: Trailer[] }>(`/games/${gameId}/movies`, { signal: controller.signal })
      .then((res) => {
        setData(res.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });
  }, [gameId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
};

export default useGameVideos;
