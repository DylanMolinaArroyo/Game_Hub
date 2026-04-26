import { useState, useCallback, useEffect } from "react";
import apiClient from "../services/api-client";

export interface GameImage {
  image: string;
  hidden: boolean;
}

const useGameImages = (gameId: number) => {
  const [data, setData] = useState<GameImage[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    return apiClient
      .get<{ results: GameImage[] }>(`/games/${gameId}/screenshots`, { signal: controller.signal })
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

export default useGameImages;
