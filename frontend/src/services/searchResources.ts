import backendAPI from "./backendAPI";

export type SearchResource = {
    
  title: string;
  url: string;
  snippet?: string;
  source?: string;
};

export const searchResources = async (
  query: string,
): Promise<SearchResource[]> => {
  const response = await backendAPI.get("/api/search-resources", {
    params: { q: query },
  });

  return response.data.resources
};
