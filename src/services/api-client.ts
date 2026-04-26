const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY as string;

export interface RequestConfig {
  signal?: AbortSignal;
  params?: Record<string, string | number | undefined>;
}

const apiClient = {
  get: async <T>(endpoint: string, config?: RequestConfig): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set("key", API_KEY);
    if (config?.params) {
      Object.entries(config.params).forEach(([k, v]) => {
        if (v !== undefined) url.searchParams.set(k, String(v));
      });
    }
    const res = await fetch(url.toString(), { signal: config?.signal });
    if (!res.ok) throw new Error(res.statusText);
    return res.json() as Promise<T>;
  },
};

export default apiClient;
