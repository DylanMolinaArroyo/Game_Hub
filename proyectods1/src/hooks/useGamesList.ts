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

interface FetchGamesParams {
  ids: string[];
}

type RefetchFunction = () => Promise<void>;

const useGamesList = (params: FetchGamesParams, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<GameProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    const { ids } = params;

    const requests = ids.map(id =>
      apiClient.get<GameProfile>(`/games/${id}`, { ...requestConfig })
    );

    return Promise.all(requests)
      .then(responses => {
        setData(responses.map(response => response.data));
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        console.error("Error fetching data:", err); 
        setError(err.message);
        setLoading(false);
      });
  }, [params, requestConfig]);

  const refetch: RefetchFunction = () => fetchData();

  return { data, error, isLoading, refetch };
};

export default useGamesList;
