import React from "react";
import { Box, Typography } from "@mui/material";
import { processStockPriceData } from "./process-stock-price-data";
import { useSelectedStockSymbols } from "./use-selected-stock-symbols";
import { PriceTable } from "./price-table";
import { StockSymbolCheckboxes } from "./stock-symbol-checkboxes";

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
    <Box width="100%" marginX="30px" marginY="50px">
      <Box marginBottom={3}>
        <Typography variant="h4" align="center">
          Stock Data
        </Typography>
      </Box>
      <Box display="flex" gap={3} alignItems="center">
        <StockSymbolCheckboxes
          stockSymbols={processedStockPriceData.stockSymbolsAlphabetical}
          selectedStockSymbols={selectedStockSymbols}
          onToggleStockSymbol={toggleSelectedStockSymbol}
        />

        <PriceTable
          stockSymbols={processedStockPriceData.stockSymbolsAlphabetical.filter(
            (s) => selectedStockSymbols.has(s)
          )}
          datesWithPrices={processedStockPriceData.sortedDatesWithPrices}
        />
      </Box>
    </Box>
  );
};
