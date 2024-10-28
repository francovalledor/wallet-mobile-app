import axios from "axios";
import { COIN_API_KEY } from "../config/config";
import { useQuery } from "@tanstack/react-query";
import { keyBy, noop } from "lodash";

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

const getExchanges = async () =>
  coinApi.get<Exchange[]>("/v1/exchanges").then((res) => res.data);

type IconResp = {
  exchange_id: string;
  url: string;
};

const getIcons = async () =>
  coinApi.get<IconResp[]>("/v1/exchanges/icons/256").then((res) => res.data);

const getExchangesWithIcons = async () => {
  const [exchanges, icons] = await Promise.all([getExchanges(), getIcons()]);

  const iconsByExchange = keyBy(icons, (ic) => ic.exchange_id);

  return exchanges.map((exc) => ({
    ...exc,
    icon: iconsByExchange[exc.exchange_id],
  }));
};

const A_WHOLE_DAY = 60 * 60 * 24 * 1000;

export const useCoins = () =>
  useQuery({
    queryKey: ["coinList"],
    queryFn: getExchangesWithIcons,
    staleTime: A_WHOLE_DAY,
  });
