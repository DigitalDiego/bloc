import axios from "axios";

export const baseUrl = "https://crypto-update-live.p.rapidapi.com";

export const fetchApi = async (url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "584966b816msh81d5b95c1ed1131p107bc0jsn02067aa9809f",
      "X-RapidAPI-Host": "crypto-update-live.p.rapidapi.com",
    },
  });
  return data;
};
