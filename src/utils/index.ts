import axios from "axios";

export const baseUrl = "https://crypto-update-live.p.rapidapi.com";

export const fetchApi = async (url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "crypto-update-live.p.rapidapi.com",
    },
  });
  return data;
};
