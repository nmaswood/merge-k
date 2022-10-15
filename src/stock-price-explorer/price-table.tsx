import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

import { StockSymbol, DateWithPrices } from "./types";

export interface PriceTable {
  stockSymbols: StockSymbol[];
  datesWithPrices: DateWithPrices[];
}
export const PriceTable: React.FC<PriceTable> = ({
  stockSymbols,
  datesWithPrices,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell align="left">
          <strong>Date</strong>
        </TableCell>
        {stockSymbols.map((stockSymbol) => (
          <TableCell align="center">
            <strong>{stockSymbol}</strong>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {datesWithPrices.map(({ original, pricesForDate }) => (
        <TableRow key={original}>
          <TableCell>{original}</TableCell>
          {stockSymbols.map((stockSymbol) => (
            <TableCell align="center">{pricesForDate[stockSymbol]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
