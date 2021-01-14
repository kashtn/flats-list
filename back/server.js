const express = require("express");
const fs = require("fs");

const app = express();

app.listen(3001, () => {
  console.log("Server is ready");
});

app.get("/flats", (req, res) => {
  fs.readFile("./flats.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
