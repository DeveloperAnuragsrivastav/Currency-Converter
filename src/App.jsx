import React, { useEffect, useState } from "react";
import MoneyExchangeHook from "./CustomHook/MoneyExchangeHook";
import money from "./assets/money.png";

const App = () => {
  const [fromSelectedCurrency, setFromSelectedCurrency] = useState("usd");
  const [toSelectedCurrency, setToSelectedCurrency] = useState("inr");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [isSwapped, setIsSwapped] = useState(false)
  const exchangeRate = MoneyExchangeHook(fromSelectedCurrency);

  useEffect(() => {
    if (exchangeRate && exchangeRate[toSelectedCurrency]) {
      setConvertedAmount((amount * exchangeRate[toSelectedCurrency]).toFixed(2));
    }
  }, [amount, fromSelectedCurrency, toSelectedCurrency, exchangeRate]);

  const handleSwap = () => {
    setIsSwapped(true)
    setFromSelectedCurrency(toSelectedCurrency);
    setToSelectedCurrency(fromSelectedCurrency);
  };
  setTimeout(() => {
    setIsSwapped(false);
  }, 500);

  return (
    <div className="h-screen bg-white font-extrabold flex justify-center items-center text-center">
      <div className="card flex justify-center items-center text-center h-71 border-3 border-yellow-600 w-171">
      
        <div
          style={{
            backgroundImage: `url(${money})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="h-70 w-60"
        />

        <div className="content bg-black opacity-90 w-110 h-70 flex flex-col justify-center items-center p-4">
          <div className="majorbox1 flex bg-white rounded-2xl p-5 w-full text-black gap-4">
            <div className="box1 flex flex-col">
              <label className="mb-1">From</label>
              <input
                type="number"
                placeholder="You can write here"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && value >= 0) {
                    setAmount(value);
                  }
                }}
                className="p-2 rounded-md bg-yellow-600 text-white outline-none"
              />
            </div>
            <div className="box2 flex flex-col">
              <label className="mb-1">Currency Type</label>
              <select
                value={fromSelectedCurrency}
                onChange={(e) => setFromSelectedCurrency(e.target.value)}
                className="p-2 rounded-md bg-yellow-600 text-white outline-none"
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

          <div className="relative w-full flex justify-center">
            <button
              onClick={handleSwap}
              className={`px-4 py-2 border-black border-3 rounded-2xl absolute top-3 transform -translate-y-1/2 
                ${isSwapped ? "bg-green-500" : "bg-blue-700"} transition-colors duration-500`}
            
            >
              Swap
            </button>
          </div>

          <div className="majorbox1 flex bg-white rounded-2xl p-5 w-full text-black gap-4 mt-4">
            <div className="box1 flex flex-col">
              <label className="mb-1">To</label>
              <input
                type="number"
                value={convertedAmount}
                placeholder="1"
                readOnly
                className="p-2 rounded-md bg-yellow-600 text-white outline-none"
              />
            </div>
            <div className="box2 flex flex-col">
              <label className="mb-1">Currency Type</label>
              <select
                value={toSelectedCurrency}
                onChange={(e) => setToSelectedCurrency(e.target.value)}
                className="p-2 rounded-md bg-yellow-600 text-white outline-none"
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
