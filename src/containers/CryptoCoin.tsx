import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ICryptoCoin } from "../../types";
import { AiOutlineLoading } from "react-icons/ai";
import HTMLReactParser from "html-react-parser";

export default function CryptoCoin() {
  const [coin, setCoin] = useState<ICryptoCoin | null>(null);
  const { id }: any = useParams();

  const getCoin = async (name: string) => {
    await axios
      .get(`https://api.coingecko.com/api/v3/coins/${name}`)
      .then((res) => {
        const data = {
          id: res?.data?.id,
          name: res?.data?.name,
          image: res?.data?.image?.large,
          marketCap: res?.data?.market_data?.market_cap?.usd,
          totalVolume: res?.data?.market_data?.total_volume?.usd,
          priceChange: res?.data?.market_data?.price_change_percentage_24h,
          currentPrice: res?.data?.market_data?.current_price?.usd,
          symbol: res?.data?.symbol,
          description: res?.data?.description?.en,
          marketCapRank: res?.data?.market_cap_rank,
          coingeckoRank: res?.data?.coingecko_rank,
          high24h: res?.data?.market_data?.high_24h?.usd,
          low24h: res?.data?.market_data?.low_24h?.usd,
          priceChangeAmount:
            res?.data?.market_data?.price_change_24h_in_currency?.usd,
        };
        setCoin(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCoin(id);
  }, [id]);

  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <>
      {!coin ? (
        <div className="w-full h-[85vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="w-full h-[85vh] 2xl:max-w-7xl 2xl:mx-auto">
          {/* Coin name */}
          <div className="w-full h-[15vh] flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img
                className="w-10 h-10 object-cover"
                src={coin?.image}
                alt={coin?.name}
              />
              <p className="font-poppins text-xl">{coin?.name}</p>
            </div>
            <p className="px-4 py-1 rounded-lg bg-gray-200">{coin?.symbol}</p>
          </div>
          {/* Rank */}
          <div className="w-full lg:h-[10vh] flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>Market Cap Rank</p>
              <p>{coin?.marketCapRank}</p>
            </div>
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>Coingecko Rank</p>
              <p>{coin?.coingeckoRank}</p>
            </div>
          </div>
          {/* Price */}
          <div className="w-full lg:h-[10vh] flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>Price</p>
              <p>
                $
                {coin?.currentPrice < 10
                  ? coin?.currentPrice
                  : coin?.currentPrice?.toLocaleString()}
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>% Change</p>
              <p
                className={cn(
                  coin?.priceChange < 0 ? "text-red-500" : "text-green-500"
                )}
              >
                {coin?.priceChange?.toFixed(2)}%
              </p>
            </div>
          </div>
          {/* Price */}
          <div className="w-full lg:h-[10vh] flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>$ Change</p>
              <p
                className={cn(
                  coin?.priceChangeAmount < 0
                    ? "text-red-500"
                    : "text-green-500"
                )}
              >
                $
                {coin?.priceChangeAmount < 10
                  ? coin?.priceChangeAmount?.toFixed(8)
                  : coin?.priceChangeAmount?.toLocaleString()}
              </p>
            </div>
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>Market Cap</p>
              <p>${coin?.marketCap?.toLocaleString()}</p>
            </div>
          </div>
          {/* Price */}
          <div className="w-full lg:h-[10vh] flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>Volume</p>
              <p>${coin?.totalVolume?.toLocaleString()}</p>
            </div>
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>High 24h</p>
              <p>${coin?.high24h?.toLocaleString()}</p>
            </div>
          </div>
          {/* Price */}
          <div className="w-full lg:h-[10vh] flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 h-[10vh] lg:h-auto border-b-solid border-b-gray-200 border-b-[1px] flex justify-between items-center">
              <p>Low 24h</p>
              <p>${coin?.low24h?.toLocaleString()}</p>
            </div>
          </div>
          <div className="w-full min-h-[10vh] flex items-center py-4">
            <p>{HTMLReactParser(coin?.description)}</p>
          </div>
        </div>
      )}
    </>
  );
}
