import React from "react";
import { StockSymbol } from "./types";

export const useSelectedStockSymbols = (stockSymbols: StockSymbol[]) => {
  const [selectedStockSymbols, setSelectedStockSymbols] = React.useState(
    () => new Set(stockSymbols)
  );

  const toggleSelectedStockSymbol = (stockSymbol: StockSymbol) =>
    setSelectedStockSymbols((prev) => {
      const copy = new Set(prev);
      if (copy.has(stockSymbol)) {
        copy.delete(stockSymbol);
      } else {
        copy.add(stockSymbol);
      }

      return copy;
    });

  return { selectedStockSymbols, toggleSelectedStockSymbol };
};
