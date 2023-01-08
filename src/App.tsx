import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main, Coin } from "./containers";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/coins/:id" element={<Coin />} />
    </Routes>
  );
}
