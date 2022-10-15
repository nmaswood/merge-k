export type StockSymbol = string & { __brand: "" };

export namespace StockSymbol {
  export const of = (stockSymbol: string) => stockSymbol as StockSymbol;
}

export interface DateWithPrices {
  original: string;
  date: Date;
  pricesForDate: Record<StockSymbol, number | null>;
}
