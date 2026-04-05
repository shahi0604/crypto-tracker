import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ✅ USING .then
  const fetchWithThen = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setFilteredData(result);
      })
      .catch((err) => console.log(err));
  };

  // ✅ USING async/await
  const fetchWithAsync = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      setData(result);
      setFilteredData(result);
    } catch (err) {
      console.log(err);
    }
  };

  // call both (for evaluation purpose)
  useEffect(() => {
    fetchWithThen();
    fetchWithAsync();
  }, []);

  // ✅ SEARCH FUNCTION
  const handleSearch = () => {
    const filtered = data.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // ✅ SORT BY MARKET CAP
  const sortByMarketCap = () => {
    const sorted = [...filteredData].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    setFilteredData(sorted);
  };

  // ✅ SORT BY % CHANGE
  const sortByChange = () => {
    const sorted = [...filteredData].sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    );
    setFilteredData(sorted);
  };

  return (
    <div className="container">
      <h1>Crypto Tracker</h1>

      {/* SEARCH */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <button onClick={sortByMarketCap}>
          Sort by Market Cap
        </button>

        <button onClick={sortByChange}>
          Sort by % Change
        </button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price}</td>
              <td>{coin.total_volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;