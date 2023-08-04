// Express
const express = require("express");
const path = require("path");
const { getLocationFromIp, fetchWeatherDataByCountry } = require("./shared");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("async", true);

app.get("/", async (req, res) => {
  const data = await getLocationFromIp();
  const values = await fetchWeatherDataByCountry(data.city);
  console.log(values);
  // console.log(values.forecast.forecastday);

  let fulldate = new Date(values.location.localtime).toLocaleString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  });

  const getWeekDayFromDate = (date) =>
    new Date(date).toLocaleString("en-us", {
      weekday: "long",
    });

  // Dynamic data that you want to pass to the EJS template
  const dynamicData = {
    city: data.city,
    country: data.country_name,
    temperature: values.current.temp_c,
    dateTime: fulldate,
    forecast: values.current.condition.text,
    weathericon: `https:${values.current.condition.icon}`,
    feel: Math.round(values.current.feelslike_c),
    humidity: values.current.humidity,
    wind: values.current.wind_kph,
    pressure: values.current.pressure_mb,
    threeDaysForecast: values.forecast.forecastday,
    getWeekDayFromDate: getWeekDayFromDate,
  };

  // Render the EJS template with the dynamic data and send it to the client
  res.render("index", { dynamicData });
});

//Set the folder where your static files are loacted
app.use(express.static(path.join(__dirname, "public")));

app.get((res, req) => {
  console.log(capitalize("hello"));
});

//Serve the javascript file index.js file
app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "index.js"));
});

app.get("/shared.js", (req, res) => {
  res.sendFile(path.join(__dirname, "shared.js"));
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

//Start the server and listen on the specified  port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
