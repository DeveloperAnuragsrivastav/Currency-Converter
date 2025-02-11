import React, { useEffect, useState } from "react";
import MoneyExchangeHook from "./CustomHook/MoneyExchangeHook";
import money from "./assets/money.png";

const App = () => {
  const [fromSelectedCurrency, setFromSelectedCurrency] = useState("usd");
  const [toSelectedCurrency, setToSelectedCurrency] = useState("inr");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [isSwapped, setIsSwapped] = useState(false);
  const exchangeRate = MoneyExchangeHook(fromSelectedCurrency);

  useEffect(() => {
    if (exchangeRate && exchangeRate[toSelectedCurrency]) {
      setConvertedAmount((amount * exchangeRate[toSelectedCurrency]).toFixed(2));
    }
  }, [amount, fromSelectedCurrency, toSelectedCurrency, exchangeRate]);

  const handleSwap = () => {
    setIsSwapped(true);
    setFromSelectedCurrency(toSelectedCurrency);
    setToSelectedCurrency(fromSelectedCurrency);
    setTimeout(() => setIsSwapped(false), 500);
  };

  return (
    <div className="h-screen bg-white flex justify-center items-center p-4">
      <div className="h-auto sm:h-71 border-3 border-yellow-600 w-171 flex flex-col sm:flex-row justify-center items-center text-center">
        <div className="w-full sm:w-60 md:w-72 lg:w-80 h-full flex justify-center items-center">
          <img src={money} alt="Money" className="w-full h-full object-cover" />
        </div>
        <div className="content bg-black opacity-90 w-full sm:w-110 h-auto sm:h-70 flex flex-col justify-center items-center p-4">
          <div className="majorbox1 flex flex-col sm:flex-row bg-white rounded-2xl p-4 w-full text-black gap-4">
            <div className="box1 flex flex-col w-full sm:w-auto">
              <label className="mb-1">From</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && value >= 0) setAmount(value);
                }}
                className="p-2 rounded-md bg-yellow-600 text-white outline-none w-full"
              />
            </div>
            <div className="box2 flex flex-col w-full sm:w-auto">
              <label className="mb-1">Currency</label>
              <select
                value={fromSelectedCurrency}
                onChange={(e) => setFromSelectedCurrency(e.target.value)}
                className="p-2 rounded-md bg-yellow-600 text-white outline-none w-full"
              >
                {exchangeRate &&
                  Object.keys(exchangeRate).map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="relative w-full flex justify-center my-2">
            <button
              onClick={handleSwap}
              className={`px-4 py-2 border-3 rounded-2xl transition-colors duration-500 ${isSwapped ? "bg-green-500" : "bg-blue-700"} text-white`}
            >
              Swap
            </button>
          </div>
          <div className="majorbox1 flex flex-col sm:flex-row bg-white rounded-2xl p-4 w-full text-black gap-4">
            <div className="box1 flex flex-col w-full sm:w-auto">
              <label className="mb-1">To</label>
              <input
                type="number"
                value={convertedAmount}
                placeholder="Converted amount"
                readOnly
                className="p-2 rounded-md bg-yellow-600 text-white outline-none w-full"
              />
            </div>
            <div className="box2 flex flex-col w-full sm:w-auto">
              <label className="mb-1">Currency</label>
              <select
                value={toSelectedCurrency}
                onChange={(e) => setToSelectedCurrency(e.target.value)}
                className="p-2 rounded-md bg-yellow-600 text-white outline-none w-full"
              >
                {exchangeRate &&
                  Object.keys(exchangeRate).map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
