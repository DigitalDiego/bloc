export interface ICoin {
  id: string;
  name: string;
  image: string;
  marketCap: number;
  totalVolume: number;
  priceChange: number;
  currentPrice: number;
}

export interface ICryptoCoin {
  id: string;
  name: string;
  image: string;
  marketCap: number;
  totalVolume: number;
  priceChange: number;
  currentPrice: number;
  symbol: string;
  description: string;
  marketCapRank: number;
  coingeckoRank: number;
  high24h: number;
  low24h: number;
  priceChangeAmount: number;
}

export interface INews {
  Title: string;
  URL: string;
}
