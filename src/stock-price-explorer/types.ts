export type StockSymbol = string & { __brand: "" };

export namespace StockSymbol {
  export const of = (stockSymbol: string) => stockSymbol as StockSymbol;
}
