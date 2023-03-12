import React from "react";

export default function Home() {
  return (
    <div className="w-full h-[85vh] flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-full flex flex-col gap-2 justify-center lg:items-start items-center">
        <b className="text-4xl lg:text-5xl text-center lg:text-left">
          Welcome to Bloc
        </b>
        <p className="text-sm text-center lg:text-left w-4/5 lg:w-full">
          Learn and keep up with the blockchain in an simple manner. Check out
          current coin data and trending news.
        </p>
      </div>
      <div className="w-full lg:w-1/2 h-full grid place-items-center">
        <img
          className="w-1/4 lg:w-[45%] object-cover"
          src="/images/hero.svg"
          alt="hero"
        />
      </div>
    </div>
  );
}
