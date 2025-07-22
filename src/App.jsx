// src/App.jsx
import { useEffect, useState } from 'react';
import CryptoCard from './components/CryptoCard';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true'
    )
      .then((res) => res.json())
      .then((json) => setCoins(json))
      .catch((err) => console.error('API fetch error:', err));
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-4`}>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">Crypto Dashboard</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 rounded-md text-sm text-black"
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 rounded-md text-sm font-semibold border"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCoins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}
