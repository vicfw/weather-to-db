const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  temp: {
    type: Number,
  },
  name: {
    type: String,
  },
  humidity: {
    type: Number,
  },
});

module.exports = mongoose.model("weather", schema);
