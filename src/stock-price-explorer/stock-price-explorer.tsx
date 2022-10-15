import React from "react";
import { Box, Typography, Checkbox } from "@material-ui/core";
import { StockSymbol } from "./types";
import { processStockPriceData } from "./process-stock-price-data";

export interface StockPriceExplorerProps {
  dates: string[];
  prices: Record<string, (number | null)[]>;
}
export const StockPriceExplorer: React.FC<StockPriceExplorerProps> = ({
  dates,
  prices,
}) => {
  const processedStockPriceData = React.useMemo(
    () => processStockPriceData({ dates, prices }),
    [dates, prices]
  );

  const { selectedStockSymbols, toggleSelectedStockSymbol } =
    useSelectedStockSymbols(processedStockPriceData.stockSymbolsAlphabetical);

  return (
    <Box width="100%" marginX="30px" marginY="50px" display="flex">
      <Typography variant="h4" align="center">
        Stock Data
      </Typography>

      <StockSymbolCheckboxs
        stockSymbols={processedStockPriceData.stockSymbolsAlphabetical}
        selectedStockSymbols={selectedStockSymbols}
        onToggleStockSymbol={toggleSelectedStockSymbol}
      />
    </Box>
  );
};

interface StockDataDisplayProps {
  // alphabetical
  stocks: StockSymbol[];
  selectedStockSymbols: Set<StockSymbol>;
  onToggleStockSymbol: (s: StockSymbol) => void;
}

const StockSymbolCheckboxs: React.FC<{
  stockSymbols: StockSymbol[];
  selectedStockSymbols: Set<StockSymbol>;
  onToggleStockSymbol: (s: StockSymbol) => void;
}> = ({ stockSymbols, selectedStockSymbols, onToggleStockSymbol }) => {
  return (
    <Box display="flex" gridGap={1}>
      {stockSymbols.map((stockSymbol) => (
        <StockSymbolCheckbox
          key={stockSymbol}
          stockSymbol={stockSymbol}
          selected={selectedStockSymbols.has(stockSymbol)}
          onToggleStockSymbol={onToggleStockSymbol}
        />
      ))}
    </Box>
  );
};

const StockSymbolCheckbox: React.FC<{
  stockSymbol: StockSymbol;
  selected: boolean;
  onToggleStockSymbol: (s: StockSymbol) => void;
}> = ({ stockSymbol, selected, onToggleStockSymbol }) => {
  return (
    <Box display="flex" gridGap={1}>
      <Checkbox
        checked={selected}
        onChange={() => onToggleStockSymbol(stockSymbol)}
      />
      <Typography>{stockSymbol}</Typography>
    </Box>
  );
};

const useSelectedStockSymbols = (stockSymbols: StockSymbol[]) => {
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
