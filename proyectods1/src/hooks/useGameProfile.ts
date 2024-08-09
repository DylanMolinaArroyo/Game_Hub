import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError, AxiosRequestConfig } from "axios";

export interface Platform {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface GameProfile {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  description: string;
  background_image_additional: string;
}

const useGameProfile = (gameId: number, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<GameProfile | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<GameProfile>(`/games/${gameId}`, {
        signal: controller.signal,
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

    return () => controller.abort();
  }, [gameId, requestConfig]);

  return { data, error, isLoading };
};

export default useGameProfile;
