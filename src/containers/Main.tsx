import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICoin } from "../../types";
import { AiOutlineSearch, AiOutlineLoading } from "react-icons/ai";
import { Coin } from "../components";

export default function Main() {
  const [coins, setCoins] = useState<Array<ICoin>>([]);
  const [search, setSearch] = useState("");

  const searched = coins?.filter((coin: ICoin) =>
    coin?.name?.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        const data: ICoin[] = res?.data?.map((coin: any) => ({
          id: coin?.id,
          name: coin?.name,
          image: coin?.image,
          current_price: coin?.current_price,
          market_cap: coin?.market_cap,
          total_volume: coin?.total_volume,
          price_change_percentage_24h: coin?.price_change_percentage_24h,
        }));
        setCoins(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <div className="w-full h-[10vh] flex justify-between items-center 2xl:max-w-7xl 2xl:mx-auto">
        <div className="flex items-center">
          <img className="w-[25px] h-[25px]" src="/blocDark.svg" alt="logo" />
          <p className="text-2xl font-bold">BLOC</p>
        </div>
        <div className="px-4 py-2 w-1/2 lg:w-2/5 flex items-center gap-2 bg-gray-800 text-gray-200 rounded-lg">
          <AiOutlineSearch />
          <input
            className="w-full bg-transparent text-gray-200 outline-none border-none"
            type="text"
            placeholder="Bitcoin, ethereum, etc."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      <div className="w-full h-[10vh] flex items-center 2xl:max-w-7xl 2xl:mx-auto">
        <div className="w-1/2 lg:w-1/5 flex justify-start items-center">
          <p className="underline underline-offset-2">Coin</p>
        </div>
        <div className="w-1/5 hidden lg:grid place-items-center">
          <p className="underline underline-offset-2">Market Cap</p>
        </div>
        <div className="w-1/5 hidden lg:grid place-items-center">
          <p className="underline underline-offset-2">Volume</p>
        </div>
        <div className="w-1/5 hidden lg:grid place-items-center">
          <p className="underline underline-offset-2">% Change</p>
        </div>
        <div className="w-1/2 lg:w-1/5 flex justify-end items-center">
          <p className="underline underline-offset-2">Price</p>
        </div>
      </div>
      {coins.length !== 0 ? (
        <div className="w-full 2xl:max-w-7xl 2xl:mx-auto">
          {searched?.map((coin: ICoin) => (
            <Coin {...coin} key={coin?.id} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[80vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin text-gray-800" />
        </div>
      )}
    </>
  );
}
