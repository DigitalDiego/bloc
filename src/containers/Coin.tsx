import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IDetails } from "../../types";
import { AiOutlineLoading } from "react-icons/ai";

export default function Coin() {
  const [coin, setCoin] = useState<IDetails>({
    id: null,
    name: "",
    market_cap: 0,
    total_volume: 0,
    image: "",
    symbol: "",
    current_price: 0,
    price_change_percentage_24h: 0,
    price_change_percentage_24h_in_currency: 0,
    high24h: 0,
    low24h: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        const data: IDetails = {
          id: res?.data?.id,
          name: res?.data?.name,
          market_cap: res?.data?.market_data?.market_cap?.usd,
          total_volume: res?.data?.market_data?.total_volume?.usd,
          image: res?.data?.image?.large,
          symbol: res?.data?.symbol,
          current_price: res?.data?.market_data?.current_price?.usd,
          price_change_percentage_24h:
            res?.data?.market_data?.price_change_percentage_24h,
          price_change_percentage_24h_in_currency:
            res?.data?.market_data?.price_change_percentage_24h_in_currency
              ?.usd,
          high24h: res?.data?.market_data?.high_24h?.usd,
          low24h: res?.data?.market_data?.low_24h?.usd,
        };
        setCoin(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <>
      <div className="w-full h-[10vh] flex justify-start items-center 2xl:max-w-7xl 2xl:mx-auto">
        <Link className="flex items-center gap-2" to="..">
          <IoIosArrowBack />
          <p>Back</p>
        </Link>
      </div>
      {!coin?.id ? (
        <div className="w-full h-[90vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin text-gray-800" />
        </div>
      ) : (
        <div className="w-full lg:w-1/2 mx-auto h-[90vh] 2xl:max-w-7xl 2xl:mx-auto">
          <div className="w-full h-[10vh] flex justify-start items-center gap-2">
            <img className="w-[50px]" src={coin?.image} alt={coin?.name} />
            <p className="text-xl">{coin?.name}</p>
            <p className="text-gray-200 text-xs px-2 py-1 bg-gray-800 rounded-lg">
              {coin?.symbol}
            </p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>Current Price:</p>
            <p>
              $
              {coin?.current_price < 10
                ? coin?.current_price
                : coin?.current_price?.toLocaleString()}
            </p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>Market Cap:</p>
            <p>${coin?.market_cap?.toLocaleString()}</p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>Volume:</p>
            <p>${coin?.total_volume?.toLocaleString()}</p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>% Change:</p>
            <p
              className={cn(
                coin?.price_change_percentage_24h < 0
                  ? "text-rose-700"
                  : "text-green-700"
              )}
            >
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>$ Change:</p>
            <p
              className={cn(
                coin?.price_change_percentage_24h < 0
                  ? "text-rose-700"
                  : "text-green-700"
              )}
            >
              ${coin?.price_change_percentage_24h_in_currency}
            </p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>High 24h:</p>
            <p>
              $
              {coin?.high24h < 10
                ? coin?.high24h
                : coin?.high24h?.toLocaleString()}
            </p>
          </div>
          <div className="w-full h-[10vh] border-b-solid border-b-gray-800 border-b-[1px] flex justify-between items-center 2xl:h-[8vh]">
            <p>Low 24h:</p>
            <p>
              $
              {coin?.low24h < 10
                ? coin?.low24h
                : coin?.low24h?.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
