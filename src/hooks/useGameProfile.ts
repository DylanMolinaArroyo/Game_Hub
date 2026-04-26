import { useState, useCallback, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface GameProfile {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  developers: Developer[];
  metacritic: number;
  description: string;
  playtime: number;
  released: string;
  website: string;
}

const useGameProfile = (gameId: number) => {
  const [data, setData] = useState<GameProfile | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    return apiClient
      .get<GameProfile>(`/games/${gameId}`, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  }, [gameId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
};

export default useGameProfile;
