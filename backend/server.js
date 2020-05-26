require("dotenv").config({ path: ".env" });

const axios = require("axios");
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Test GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// POST route for Firebase upload
app.post("/firebase_upload", (req, res) => {
  console.log("Request to /firebase_upload");
  console.log(req.body);
  console.log(process.env.FIREBASE_DATABASE_URL);
  axios.post(process.env.FIREBASE_DATABASE_URL, req.body);
  res.send({ express: "SENDING POST REQUEST TO FIREBASE" });
});
