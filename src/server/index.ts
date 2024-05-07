const express = require("express");
const fs = require("fs");

const resume = require("./resume.json");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.send(resume);
});

app.listen(port, () => {
  console.log(`Local resume available on port ${port}`);
});
