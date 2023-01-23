const express = require("express");

const app = express();

const https = require("https");

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Rambipuji&units=metric&appid=99b071b376c77b1b4e6e664636eb4b05";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = Math.floor(weatherData.main.temp);
      const weatherDesc = weatherData.weather[0].description;
      const city = weatherData.name;
      const icons = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icons}@2x.png`;

      console.log(icons);
      console.log(imageUrl);

      res.write(`<p>The weather is currently ${weatherDesc}</p>`);
      res.write(`<h1>The temperatur in ${city} is ${temp}&#8451;</h1>`);
      res.write(`<img src=${imageUrl}>`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
