export interface ICoin {
  id: string;
  name: string;
  image: string;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  current_price: number;
}

export interface IDetails {
  id: string | null;
  name: string;
  market_cap: number;
  total_volume: number;
  image: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h_in_currency: number;
  high24h: number;
  low24h: number;
}
