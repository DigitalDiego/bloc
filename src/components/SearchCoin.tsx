import React from "react";
import { ICoin } from "../../types";
import { Link } from "react-router-dom";

export default function SearchCoin(props: ICoin) {
  return (
    <Link
      to={`/crypto/${props?.id}`}
      className="w-full bg-gray-100 px-4 py-2 h-[70px] rounded-lg flex justify-start items-center gap-1"
    >
      <img
        className="w-6 h-6 object-cover"
        src={props?.image}
        alt={props?.name}
      />
      <p className="text-sm">{props?.name}</p>
    </Link>
  );
}
