import { StockSymbol, DateWithPrices } from "./types";
import { parseDate } from "./parse-date";

export interface StockPriceExplorerInput {
  dates: string[];
  prices: Record<string, (number | null)[]>;
}

export interface ProcessedStockPriceData {
  sortedDatesWithPrices: DateWithPrices[];
  stockSymbolsAlphabetical: StockSymbol[];
}

export function processStockPriceData({
  dates,
  prices,
}: StockPriceExplorerInput): ProcessedStockPriceData {
  const datesWithPrices = dates.map((date, index) => {
    const pricesForDate = Object.fromEntries(
      Object.entries(prices).map(
        ([stockSymbol, pricesForDates]) =>
          [stockSymbol, pricesForDates[index]] as [string, number | null]
      )
    ) as Record<StockSymbol, number | null>;

    return {
      original: date,
      date: parseDate(date),
      pricesForDate,
    };
  });

  return {
    sortedDatesWithPrices: datesWithPrices
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reverse(),
    stockSymbolsAlphabetical: [...new Set(Object.keys(prices))]
      .sort()
      .map(StockSymbol.of),
  };
}
