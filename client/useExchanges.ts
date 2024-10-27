import axios from "axios";
import { COIN_API_KEY } from "../config";

interface Exchange {
  exchange_id: string;
  website: string;
  name: string;
  data_quote_start: string;
  data_quote_end: string;
  data_orderbook_start: string;
  data_orderbook_end: string;
  data_trade_start: string;
  data_trade_end: string;
  data_symbols_count: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
}

const coinApi = axios.create({
  baseURL: "https://rest.coinapi.io",
  headers: {
    "X-CoinAPI-Key": COIN_API_KEY,
  },
});

export const getExchanges = async () =>
  coinApi.get<Exchange[]>("/v1/exchanges").then((res) => res.data);
