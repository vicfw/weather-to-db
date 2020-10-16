const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Weather = require("./weather-model");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/my-db", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connected");
  });

app.get("/:city", async (req, res) => {
  const params = req.params.city;
  try {
    const data = await axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          params +
          "&units=metric&appid=108d696076b33ee11c1f38b1a31f1f5b"
      )
      .then(response => {
        needData = {
          temp: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
        };

        return needData;
      });
    Weather.insertMany(data, (err, weather) => {
      if (err) {
        return res.send(err);
      } else {
        res.send(weather);
      }
    });
  } catch (e) {
    res.send(e);
  }
});

app.listen(3000, () => {
  console.log("Server is Running");
});
