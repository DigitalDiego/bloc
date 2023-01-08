import React from "react";
import { Link } from "react-router-dom";
import { ICoin } from "../../types";

export default function Coin(props: ICoin) {
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <Link
      className="w-full h-[10vh] flex items-center border-b-solid border-b-gray-800 border-b-[1px] 2xl:h-[8vh]"
      to={`/coins/${props?.id}`}
    >
      <div className="w-1/2 lg:w-1/5 flex justify-start items-center gap-2">
        <img className="w-[35px]" src={props?.image} alt={props?.name} />
        <p>{props?.name}</p>
      </div>
      <div className="w-1/5 hidden lg:grid place-items-center">
        <p>${props?.market_cap?.toLocaleString()}</p>
      </div>
      <div className="w-1/5 hidden lg:grid place-items-center">
        <p>${props?.total_volume?.toLocaleString()}</p>
      </div>
      <div
        className={cn(
          "w-1/5 hidden lg:grid place-items-center",
          props?.price_change_percentage_24h < 0
            ? "text-rose-700"
            : "text-green-700"
        )}
      >
        <p>{props?.price_change_percentage_24h?.toFixed(2)}%</p>
      </div>
      <div className="w-1/2 lg:w-1/5 flex justify-end items-center">
        $
        {props?.current_price < 10
          ? props?.current_price
          : props?.current_price?.toLocaleString()}
      </div>
    </Link>
  );
}
