import axios from "axios";
import { COIN_API_KEY } from "../config/config";
import { useQuery } from "@tanstack/react-query";
import { keyBy, noop } from "lodash";
import { Exchange } from "../types/exchange";

const coinApi = axios.create({
  baseURL: "https://rest.coinapi.io",
  headers: {
    "X-CoinAPI-Key": COIN_API_KEY,
  },
});

const getExchanges = async () =>
  coinApi
    .get<Omit<Exchange, "icon">[]>("/v1/exchanges")
    .then((res) => res.data);

type IconResp = {
  exchange_id: string;
  url: string;
};

const getIcons = async () =>
  coinApi.get<IconResp[]>("/v1/exchanges/icons/256").then((res) => res.data);

const getExchangesWithIcons = async (): Promise<Exchange[]> => {
  const [exchanges, icons] = await Promise.all([getExchanges(), getIcons()]);

  const iconsByExchange = keyBy(icons, (ic) => ic.exchange_id);

  const result = exchanges.map((exc) => ({
    ...exc,
    icon: iconsByExchange[exc.exchange_id]?.url,
  }));

  return result;
};

const A_WHOLE_DAY = 60 * 60 * 24 * 1000;

export const useExchanges = () =>
  useQuery({
    queryKey: ["coinList"],
    queryFn: getExchangesWithIcons,
    staleTime: A_WHOLE_DAY,
  });
