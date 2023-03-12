import React, { useState, useEffect } from "react";
import { baseUrl, fetchApi } from "../utils";
import { INews } from "../../types";
import { NewsArticle } from "../components";
import { AiOutlineLoading } from "react-icons/ai";

export default function News() {
  const [news, setNews] = useState<Array<INews> | null>(null);

  const getNews = async () => {
    const data = await fetchApi(`${baseUrl}/news`)
      .then((data) => {
        setNews(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      {!news ? (
        <div className="w-full h-[85vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="w-full grid place-items-start grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 py-4 2xl:max-w-7xl 2xl:mx-auto">
          {news?.map((article, index) => (
            <NewsArticle {...article} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
