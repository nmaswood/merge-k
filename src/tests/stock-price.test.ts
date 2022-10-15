import { StockPriceImpl } from "../stock-prices/stock-price-impl";
import { StockSymbol } from "../stock-price-explorer/types";
import { expect, test } from "vitest";

test("can init with empty input", () => {
  expect(() => new StockPriceImpl([])).not.toThrow();
});

test("should throw an unexpected ticker", () => {
  const impl = new StockPriceImpl([
    { AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/22/2014" },
  ]);
  expect(() =>
    impl.getPricesMultiple({ stockSymbols: ["CRM"] as StockSymbol[] })
  ).to.throw();
});

test("should pass a simple test case", () => {
  const impl = new StockPriceImpl([
    { AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/22/2014" },
  ]);

  expect(
    impl.getPricesMultiple({
      stockSymbols: ["AAPL", "MSFT", "AMZN"] as StockSymbol[],
    })
  ).toEqual({
    dates: ["1/22/2014"],
    prices: { AAPL: [19.7], MSFT: [35.93], AMZN: [20.23] },
  });
});

test("should pass another simple test case", () => {
  const impl = new StockPriceImpl([
    { AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/22/2014" },
    { AAPL: 10, MSFT: 30, AMZN: 50, date: "1/22/2015" },
    { AAPL: 20, MSFT: 40, AMZN: 60, date: "1/22/2016" },
  ]);

  const res = impl.getPricesMultiple({
    stockSymbols: ["AAPL", "MSFT", "AMZN"] as StockSymbol[],
  });

  expect(res).toEqual({
    dates: ["1/22/2014", "1/22/2015", "1/22/2016"],
    prices: {
      AAPL: [19.7, 10, 20],
      MSFT: [35.93, 30, 40],
      AMZN: [20.23, 50, 60],
    },
  });
});

test("should respect start and end by", () => {
  const impl = new StockPriceImpl([
    { AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/1/2014" },
    { AAPL: 10, MSFT: 30, AMZN: 50, date: "1/1/2015" },
    { AAPL: 20, MSFT: 40, AMZN: 60, date: "1/1/2016" },
    { AAPL: 20, MSFT: 40, AMZN: 60, date: "1/1/2017" },
  ]);

  const res = impl.getPricesMultiple({
    stockSymbols: ["AAPL", "MSFT"] as StockSymbol[],
    startDate: new Date(2014, 6, 1),
    endDate: new Date(2016, 6, 1),
  });

  expect(res).toEqual({
    dates: ["1/1/2015", "1/1/2016"],
    prices: { AAPL: [10, 20], MSFT: [30, 40] },
  });
});

test("have an equal length for all ticker responses", () => {
  const impl = new StockPriceImpl([
    { MSFT: 35.93, AMZN: 20.23, date: "1/1/2014" },
    { MSFT: 30, AMZN: 50, date: "1/1/2015" },
    { AMZN: 60, date: "1/1/2016" },
    { AAPL: 20, MSFT: 40, AMZN: 60, date: "1/1/2017" },
  ]);

  const res = impl.getPricesMultiple({
    stockSymbols: ["AAPL", "MSFT"] as StockSymbol[],
  });

  expect(res).toEqual({
    dates: ["1/1/2014", "1/1/2015", "1/1/2017"],
    prices: { AAPL: [null, null, 20], MSFT: [35.93, 30, 40] },
  });
});

test("should be sorted", () => {
  const impl = new StockPriceImpl([
    { MSFT: 30, AMZN: 50, date: "1/1/2015" },
    { AAPL: 20, MSFT: 40, AMZN: 60, date: "1/1/2017" },
    { MSFT: 35.93, AMZN: 20.23, date: "1/1/2014" },
    { AMZN: 60, date: "1/1/2016" },
  ]);

  const res = impl.getPricesMultiple({
    stockSymbols: ["AAPL", "MSFT"] as StockSymbol[],
  });

  expect(res).toEqual({
    dates: ["1/1/2014", "1/1/2015", "1/1/2017"],
    prices: { AAPL: [null, null, 20], MSFT: [35.93, 30, 40] },
  });
});

test("can supply no tickers", () => {
  const impl = new StockPriceImpl([
    { MSFT: 30, AMZN: 50, date: "1/1/2015" },
    { AAPL: 20, MSFT: 40, AMZN: 60, date: "1/1/2017" },
    { MSFT: 35.93, AMZN: 20.23, date: "1/1/2014" },
    { AMZN: 60, date: "1/1/2016" },
  ]);

  const res = impl.getPricesMultiple({
    stockSymbols: [],
  });
  expect(res).toEqual({
    dates: [],
    prices: {},
  });
});
