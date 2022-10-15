import {
  StockPriceInterface,
  GetPricesMultipleArguments,
  GetPricesMultipleResponse,
  StockPriceInput,
} from "./stock-price-interface";

import { uniqBy } from "lodash";

import { StockSymbol } from "../stock-price-explorer/types";

import { parseDate } from "../stock-price-explorer/parse-date";

export class StockPriceImpl implements StockPriceInterface {
  private readonly priceAndDates: Record<StockSymbol, PriceAndDate[]>;

  constructor(inputs: StockPriceInput[]) {
    this.priceAndDates = this.#processInputs(inputs);
  }

  getPricesMultiple({
    stockSymbols,
    startDate,
    endDate,
  }: GetPricesMultipleArguments): GetPricesMultipleResponse {
    const priceDataForStockSymbols = stockSymbols.map((stockSymbol) => ({
      stockSymbol,
      priceMap: this.#getPriceByDate(stockSymbol, startDate, endDate),
    }));

    const sortedDates = this.#getSortedDates(
      priceDataForStockSymbols.flatMap((p) => Object.values(p.priceMap))
    );

    const prices: Record<StockSymbol, (number | null)[]> = {};

    for (const { stockSymbol, priceMap } of priceDataForStockSymbols) {
      const priceAcc: (number | null)[] = [];
      for (const date of sortedDates) {
        const priceValue = priceMap[date]?.price ?? null;
        priceAcc.push(priceValue);
      }
      prices[stockSymbol] = priceAcc;
    }

    return {
      dates: sortedDates,
      prices,
    };
  }

  #getSortedDates(priceAndDates: PriceAndDate[]): string[] {
    const uniqueDates = uniqBy(priceAndDates, (price) => price.date.getTime());
    const sortedDates = uniqueDates
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reverse()
      .map((d) => d.original);

    return sortedDates;
  }

  #getPriceByDate(
    stockSymbol: StockSymbol,
    startDate?: Date,
    endDate?: Date
  ): Record<string, PriceAndDate> {
    const pricesWithDates = this.priceAndDates[stockSymbol];
    if (pricesWithDates == null) {
      throw Error("cannot recognize stock symbol");
    }

    const startIndex = startDate
      ? pricesWithDates.findIndex(
          (priceWithDate) => priceWithDate.date.getTime() >= startDate.getTime()
        )
      : 0;

    if (startIndex === -1) {
      return {};
    }

    const endDateTime = endDate?.getTime();

    const acc: Record<string, PriceAndDate> = {};

    for (let index = startIndex; index < pricesWithDates.length; index++) {
      const priceWithDate = pricesWithDates[index];
      if (endDateTime && priceWithDate.date.getTime() > endDateTime) {
        break;
      }
      acc[priceWithDate.original] = priceWithDate;
    }

    return acc;
  }

  #processInputs(
    prices: StockPriceInput[]
  ): Record<StockSymbol, PriceAndDate[]> {
    const context: Context = {
      stockSymbolPrices: {},
    };

    for (const price of prices) {
      this.#processInput(context, price);
    }

    return Object.fromEntries(
      Object.entries(context.stockSymbolPrices).map(([stockSymbol, prices]) => [
        stockSymbol,
        prices.sort((a, b) => b.date.getTime() - a.date.getTime()).reverse(),
      ])
    ) as Record<StockSymbol, PriceAndDate[]>;
  }

  #processInput(context: Context, price: StockPriceInput) {
    const { date, ...rest } = price;

    for (const [stockSymbol, price] of Object.entries(rest)) {
      const asStockSymbol = stockSymbol as StockSymbol;
      context.stockSymbolPrices[asStockSymbol] =
        context.stockSymbolPrices[asStockSymbol] ?? [];

      context.stockSymbolPrices[asStockSymbol].push({
        original: date,
        date: parseDate(date),
        price: Number(price),
      });
    }
  }
}

interface Context {
  stockSymbolPrices: Record<StockSymbol, PriceAndDate[]>;
}

interface PriceAndDate {
  original: string;
  date: Date;
  price: number;
}
