import { StockPriceExplorer } from "./stock-price-explorer/stock-price-explorer";
import "./App.css";

const TEST_DATES = ["1/17/2014", "1/21/2014", "1/22/2014"];
const TEST_PRICES: Record<string, (number | null)[]> = {
  AAPL: [19.31, 19.61, 19.7],
  MSFT: [36.38, null, 35.93],
};
function App() {
  return (
    <div className="App">
      <StockPriceExplorer dates={TEST_DATES} prices={TEST_PRICES} />
    </div>
  );
}

export default App;
