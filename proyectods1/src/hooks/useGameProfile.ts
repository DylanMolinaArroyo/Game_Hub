import { useState, useCallback } from "react";
import apiClient from "../services/api-client";
import { CanceledError, AxiosRequestConfig } from "axios";

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

type RefetchFunction = () => Promise<void>;

const useGameProfile = (gameId: number, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<GameProfile | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    return apiClient
      .get<GameProfile>(`/games/${gameId}`, {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data);
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

export default useGameProfile;
