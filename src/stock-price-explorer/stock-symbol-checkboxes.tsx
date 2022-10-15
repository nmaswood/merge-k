import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { StockSymbol } from "./types";

export const StockSymbolCheckboxes: React.FC<{
  stockSymbols: StockSymbol[];
  selectedStockSymbols: Set<StockSymbol>;
  onToggleStockSymbol: (s: StockSymbol) => void;
}> = ({ stockSymbols, selectedStockSymbols, onToggleStockSymbol }) => (
  <Box>
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

const StockSymbolCheckbox: React.FC<{
  stockSymbol: StockSymbol;
  selected: boolean;
  onToggleStockSymbol: (s: StockSymbol) => void;
}> = ({ stockSymbol, selected, onToggleStockSymbol }) => (
  <Box display="flex" alignItems="center">
    <Checkbox
      checked={selected}
      onChange={() => onToggleStockSymbol(stockSymbol)}
    />
    <Typography
      style={selected ? { color: "red", fontWeight: 900 } : undefined}
    >
      {stockSymbol}
    </Typography>
  </Box>
);
