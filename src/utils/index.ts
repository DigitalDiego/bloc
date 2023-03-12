import axios from "axios";
import { key } from "../../hidden";

export const baseUrl = "https://crypto-update-live.p.rapidapi.com";

export const fetchApi = async (url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "crypto-update-live.p.rapidapi.com",
    },
  });
  return data;
};
