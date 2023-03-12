import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Crypto, CryptoCoin, News, Search } from "./containers";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crypto" element={<Crypto />} />
      <Route path="/crypto/:id" element={<CryptoCoin />} />
      <Route path="/news" element={<News />} />
      <Route path="/search/:id" element={<Search />} />
    </Routes>
  );
}
