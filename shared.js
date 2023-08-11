const getLocationFromIp = async () => {
  const response = await fetch("https://ipecho.io/json");
  const { ip } = await response.json();

  const URL = `https://ipapi.co/${ip}/json/`;

  const res = await fetch(URL);
  //   console.log(res.text());
  const data = await res.json();
  // console.log({ data });
  return data;
};

const fetchWeatherDataByCountry = async (city) => {
  const key = `1d35dcc8063b4122ad764306233001`;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`;
  const res = await fetch(url);
  // console.log(res);
  const data = await res.json();
  return data;
};

if (typeof module !== "undefined" && module.exports) {
  exports.getLocationFromIp = getLocationFromIp;
  exports.fetchWeatherDataByCountry = fetchWeatherDataByCountry;
}
