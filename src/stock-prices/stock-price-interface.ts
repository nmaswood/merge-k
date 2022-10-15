import { StockSymbol } from "../stock-price-explorer/types";

export interface StockPriceInterface {
  getPricesMultiple: (
    args: GetPricesMultipleArguments
  ) => GetPricesMultipleResponse;
}

export interface GetPricesMultipleArguments {
  stockSymbols: StockSymbol[];
  startDate?: Date;
  endDate?: Date;
}

export interface GetPricesMultipleResponse {
  dates: string[];
  prices: Record<StockSymbol, (number | null)[]>;
}

export type StockPriceInput = Record<string, number | string> & {
  date: string;
};

const examplePrices = [
  { AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/22/2014" },

  { AAPL: 19.61, MSFT: 36.17, AMZN: 20.35, date: "1/21/2014" },

  { MSFT: 36.38, AMZN: 19.98, date: "1/17/2014" },

  { AAPL: 19.79, MSFT: 36.89, AMZN: 19.79, date: "1/16/2014" },

  { AAPL: 19.91, AMZN: 19.79, date: "1/15/2014" },

  { AAPL: 19.51, MSFT: 35.78, AMZN: 19.88, date: "1/14/2014" },
];
