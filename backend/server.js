'use strict';
const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const algoliasearch = require("algoliasearch");
const serverless = require('serverless-http');

// load environment variables from .env
dotenv.config();

// configure express server
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// console.log that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Test GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// POST route for Firebase upload
app.post("/firebase_upload", (req, res) => {
  console.log("Request to /firebase_upload");
  console.log(req.body);

  axios.post(process.env.FIREBASE_DATABASE_URL, req.body);
  res.send({ express: "SENDING POST REQUEST TO FIREBASE" });
});

// GET route for Algolia results
app.post("/algolia_search", (req, res) => {
  console.log("Request to /aloglia_search");
  console.log(req.body);

  index.search("", req.body).then(({ hits }) => {
    res.send(hits);
  });
});

//Convert to serverless
module.exports.handler = serverless(app);
