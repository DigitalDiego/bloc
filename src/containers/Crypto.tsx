import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICoin } from "../../types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CryptoCoin } from "../components";
import { AiOutlineLoading } from "react-icons/ai";

export default function Crypto() {
  const [coins, setCoins] = useState<Array<ICoin> | null>(null);
  const [page, setPage] = useState(1);

  const getCoins = async (page: number) => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
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
        setCoins(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCoins(page);
  }, [page]);

  const prev = () => {
    if (page !== 1) {
      setPage((page) => page - 1);
    }
  };
  const next = () => {
    if (page !== 3) {
      setPage((page) => page + 1);
    }
  };
  return (
    <>
      <div className="w-full h-[10vh] flex justify-between items-center 2xl:max-w-7xl 2xl:mx-auto">
        <p className="text-xl font-poppins">Crypto</p>
        <div className="flex items-center gap-4">
          <IoIosArrowBack className="cursor-pointer" onClick={prev} />
          <p>{page}</p>
          <IoIosArrowForward className="cursor-pointer" onClick={next} />
        </div>
      </div>
      <div className="w-full h-[10vh] flex items-center 2xl:max-w-7xl 2xl:mx-auto">
        <div className="w-1/2 lg:w-1/5 flex justify-start items-center">
          <p className="underline underline-offset-2">Name</p>
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
      {!coins ? (
        <div className="w-full h-[65vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        coins?.map((coin) => <CryptoCoin {...coin} key={coin?.id} />)
      )}
    </>
  );
}
