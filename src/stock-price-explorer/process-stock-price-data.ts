import { StockSymbol } from "./types";

export interface StockPriceExplorerInput {
  dates: string[];
  prices: Record<string, (number | null)[]>;
}

export interface ProcessedStockPriceData {
  dates: Date[];
  prices: Record<StockSymbol, (number | null)[]>;
  stockSymbolsAlphabetical: StockSymbol[];
}

export function processStockPriceData({
  dates,
  prices,
}: StockPriceExplorerInput): ProcessedStockPriceData {
  const parsedDates = dates.map(parseDate);
  const stockSymbolsAlphabetical = [...new Set(Object.keys(prices))]
    .sort()
    .map(StockSymbol.of);

  return {
    dates: parsedDates,
    stockSymbolsAlphabetical,
    prices: prices as Record<StockSymbol, (number | null)[]>,
  };
}

function parseDate(d: string): Date {
  var [month, day, year] = d.split("/").map((n) => parseInt(n, 10));

  // month index gotcha
  return new Date(year, month - 1, day);
}
