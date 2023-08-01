// Express
const path = require("path");
const IP = require("ip");
const express = require("express");
const app = express();
const dt = require("./utlis/getIndexHtml");

const port = 3000;

// Get the IP address
app.get("/ip", (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  req.socket.remoteAddress;
  null;

  const parseIp = (req) => req.headers["x-forwarded-for"]?.split(",").shift();
  const ipaddress = IP.address();
  console.log(ipaddress);
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // Dynamic data that you want to pass to the EJS template
  const dynamicData = {
    cityName: "Goa",
    country: "India",
    dateTime: "Tuesday 4 July 2023 16:00",
    forecast: "Rainy",
    weathericon: "http://openweathermap.org/img/wn/10d@4x.png",
    temperature: "21",
    feel: "22",
    humidity: "93",
    wind: "6.17",
    pressure: "996",
  };

  // Render the EJS template with the dynamic data and send it to the client
  res.render("index", { dynamicData });
});

//set the folder where your static files are loacted
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file
// app.get("/", (req, res) => {
//   // res.sendFile(path.join(__dirname, "index.html"));
//   res.send(dt.renderHtmlFile());
// });

//Serve the index.js file
app.get("/index.js", (req, res) => {
  //   const js = fs.readFileSync(path.join(__dirname, "/index/js"));
  //   res.type("text/javascript").send(js);
  res.sendFile(path.join(__dirname, "index.js"));
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

//Start the server and listen on the specified  port
//set the folder where your static files are loacted
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// node.js

// Create the HTTP server
// const server = http.createServer((req, res) => {
//   // Set the response content type to plain text
//   //   res.setHeader("Content-Type", "text/plain");

//   if (req.url === "/") {
//     const ip = re.headers["x-forwarded-for"];
//     req.socket.remoteAddress;
//     null;

//     const parseIp = (req) => req.headers["x-forwarded-for"]?.split(",").shift();
//     req.socket?.remoteAddress;
//     const ipaddress = IP.address();
//     res.setHeader("Content-Type", "text/plain");
//     res.end(ipaddress);
//     log(ipaddress);
//     console.log(parseIp(req));

//     // serve the html file
//     res.writeHead(200, { "Content-Type": "text/html" });
//     const html = fs.readFileSync(path.join(__dirname, "/index.html"));
//     res.end(html);

//     // serve the css
//   } else if (req.url === "/style.css") {
//     res.writeHead(200, { "Content-Type": "text/css" });
//     const css = fs.readFileSync(path.join(__dirname, "/style.css"));
//     res.end(css);
//   } else if (req.url === "/index.js") {
//     res.writeHead(200, { "Content-Type": "text/javascript" });
//     const js = fs.readFileSync(path.join(__dirname, "/index.js"));
//     res.end(js);
//     //
//   } else {
//     // If the route doesn't match any of the defined routes, return a 404 Not Found response.
//     res.statusCode = 404;
//     res.end("404 Not Found");
//   }
// });

// // Start the server and listen on the specified port
// server.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
