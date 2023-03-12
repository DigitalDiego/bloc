import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, fetchApi } from "../utils";
import { ICoin, INews } from "../../types";
import { SearchCoin, NewsArticle } from "../components";
import { AiOutlineLoading } from "react-icons/ai";

export default function Search() {
  const [coinsOne, setCoinsOne] = useState<Array<ICoin> | null>(null);
  const [coinsTwo, setCoinsTwo] = useState<Array<ICoin> | null>(null);
  const [coinsThree, setCoinsThree] = useState<Array<ICoin> | null>(null);
  const [news, setNews] = useState<Array<INews> | null>(null);
  const { id }: any = useParams();

  const getNews = async () => {
    await fetchApi(`${baseUrl}/news`)
      .then((data) => {
        setNews(data);
      })
      .catch((error) => console.error(error));
  };

  const getCoinsOne = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        const data = res?.data?.map((coin: any) => ({
          id: coin?.id,
          name: coin?.name,
          image: coin?.image,
          marketCap: coin?.market_cap,
          totalVolume: coin?.total_volume,
          priceChange: coin?.price_change_percentage_24h,
          currentPrice: coin?.current_price,
        }));
        setCoinsOne(data);
      })
      .catch((error) => console.error(error));
  };

  const getCoinsTwo = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=2&sparkline=false"
      )
      .then((res) => {
        const data = res?.data?.map((coin: any) => ({
          id: coin?.id,
          name: coin?.name,
          image: coin?.image,
          marketCap: coin?.market_cap,
          totalVolume: coin?.total_volume,
          priceChange: coin?.price_change_percentage_24h,
          currentPrice: coin?.current_price,
        }));
        setCoinsTwo(data);
      })
      .catch((error) => console.error(error));
  };

  const getCoinsThree = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=3&sparkline=false"
      )
      .then((res) => {
        const data = res?.data?.map((coin: any) => ({
          id: coin?.id,
          name: coin?.name,
          image: coin?.image,
          marketCap: coin?.market_cap,
          totalVolume: coin?.total_volume,
          priceChange: coin?.price_change_percentage_24h,
          currentPrice: coin?.current_price,
        }));
        setCoinsThree(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getNews();
  }, []);
  useEffect(() => {
    getCoinsOne();
  }, []);
  useEffect(() => {
    getCoinsTwo();
  }, []);
  useEffect(() => {
    getCoinsThree();
  }, []);

  const pageOne = coinsOne?.filter((coin) =>
    coin?.name?.toLowerCase()?.includes(id?.toLowerCase())
  );
  const pageTwo = coinsTwo?.filter((coin) =>
    coin?.name?.toLowerCase()?.includes(id?.toLowerCase())
  );
  const pageThree = coinsThree?.filter((coin) =>
    coin?.name?.toLowerCase()?.includes(id?.toLowerCase())
  );
  const searchedNews = news?.filter((article) =>
    article?.Title?.toLowerCase()?.includes(id?.toLowerCase())
  );
  return (
    <>
      <div className="w-full h-[10vh] flex justify-start items-center 2xl:max-w-7xl 2xl:mx-auto">
        <p>Showing results for: {id}</p>
      </div>
      <div className="w-full flex justify-start items-center 2xl:max-w-7xl 2xl:mx-auto">
        <p className="font-poppinsBold">Coins</p>
      </div>
      {!coinsOne || !coinsTwo || !coinsThree ? (
        <div className="w-full h-[15vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="w-full grid place-items-start gap-4 py-4 grid-cols-1 lg:grid-cols-4 2xl:max-w-7xl 2xl:mx-auto">
          {pageOne?.map((coin) => (
            <SearchCoin {...coin} key={coin?.id} />
          ))}
          {pageTwo?.map((coin) => (
            <SearchCoin {...coin} key={coin?.id} />
          ))}
          {pageThree?.map((coin) => (
            <SearchCoin {...coin} key={coin?.id} />
          ))}
        </div>
      )}
      <div className="w-full flex justify-start items-center 2xl:max-w-7xl 2xl:mx-auto">
        <p className="font-poppinsBold">News</p>
      </div>
      {!news ? (
        <div className="w-full h-[15vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="w-full grid place-items-start gap-4 py-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:max-w-7xl 2xl:mx-auto">
          {searchedNews?.map((article, index) => (
            <NewsArticle {...article} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
