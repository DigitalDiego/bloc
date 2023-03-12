import React from "react";
import { Link } from "react-router-dom";
import { ICoin } from "../../types";

export default function CryptoCoin(props: ICoin) {
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <Link
      className="w-full h-[10vh] flex items-center border-b-solid border-b-[1px] border-b-gray-200 2xl:max-w-7xl 2xl:mx-auto"
      to={`/crypto/${props?.id}`}
    >
      <div className="w-1/2 lg:w-1/5 flex justify-start items-center gap-1">
        <img
          className="w-5 h-5 object-cover"
          src={props?.image}
          alt={props?.name}
        />
        <p>{props?.name}</p>
      </div>
      <div className="w-1/5 hidden lg:grid place-items-center">
        <p>${props?.marketCap?.toLocaleString()}</p>
      </div>
      <div className="w-1/5 hidden lg:grid place-items-center">
        <p>${props?.totalVolume?.toLocaleString()}</p>
      </div>
      <div
        className={cn(
          "w-1/5 hidden lg:grid place-items-center",
          props?.priceChange < 0 ? "text-red-500" : "text-green-500"
        )}
      >
        {props?.priceChange?.toFixed(2)}%
      </div>
      <div
        className={cn(
          "w-1/2 lg:w-1/5 flex justify-end items-center",
          props?.priceChange < 0
            ? "text-red-500 lg:text-[#212121]"
            : "text-green-500 lg:text-[#212121]"
        )}
      >
        $
        {props?.currentPrice < 10
          ? props?.currentPrice
          : props?.currentPrice?.toLocaleString()}
      </div>
    </Link>
  );
}
