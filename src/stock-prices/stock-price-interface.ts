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
