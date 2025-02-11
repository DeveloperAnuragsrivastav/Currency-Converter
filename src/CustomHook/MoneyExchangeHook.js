import { useEffect, useState } from "react"


const MoneyExchangeHook = (currency) => {
  const [data, setdata] = useState({});
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => setdata(res[currency]))
      .catch((error) => console.error(error));
  }, [currency]);
  return data;
};

export default MoneyExchangeHook;
