import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useSearchAirportQuery,
  useSearchFlightsQuery,
} from "./services/flight-api.ts";

function App() {
  const [count, setCount] = useState(0);
  const { data } = useSearchAirportQuery("new");

  const { data: flights } = useSearchFlightsQuery({
    originSkyId: "NYCA",
    destinationSkyId: "LAXA",
    originEntityId: "27537542",
    destinationEntityId: "27536211",
    date: "2025-02-16",
    adults: 1,
    cabinClass: "economy",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
    sortBy: "best",
  });
  console.log("flights", flights);
  console.log(data);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
          airport is {data?.data[0].presentation.title}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
