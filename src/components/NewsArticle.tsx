import React from "react";
import { INews } from "../../types";

export default function NewsArticle(props: INews) {
  return (
    <a
      href={props?.URL}
      rel="noreferrer"
      target="_blank"
      className="w-full h-[200px] rounded-lg bg-gray-100 p-4"
    >
      <p>{props?.Title}</p>
    </a>
  );
}
