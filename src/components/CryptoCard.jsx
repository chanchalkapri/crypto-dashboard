// src/components/CryptoCard.jsx
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const CryptoCard = ({ coin, darkMode }) => {
  const chartData = coin.sparkline_in_7d?.price.map((price, index) => ({
    time: index,
    price,
  })) || [];

  const priceChangeClass =
    coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 shadow-md transition-all flex flex-col justify-between ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h2 className="text-md sm:text-lg font-bold">{coin.name}</h2>
            <span className="text-xs uppercase text-gray-400">{coin.symbol}</span>
          </div>
        </div>
        <p className={`text-sm sm:text-base font-semibold ${priceChangeClass}`}>
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </div>

      <div className="text-sm sm:text-base mb-4">
        <p>Price: ${coin.current_price.toLocaleString()}</p>
      </div>

      {/* Sparkline Chart */}
      <div className="h-20 sm:h-24 mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="price"
              stroke={coin.price_change_percentage_24h > 0 ? '#22c55e' : '#ef4444'}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoCard;
