const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const algoliasearch = require("algoliasearch");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
var bodyParser = require("body-parser");

// load environment variables from .env
dotenv.config();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);


//testing for get 
router.get("/test", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

// GET route for Algolia results
router.post("/algolia_search", (req, res) => {
  console.log("Request to /aloglia_search");
  console.log(req.body);

  index.search("", req.body).then(({ hits }) => {
    res.send(hits);
  });
});

// POST route for Firebase upload
router.post("/firebase_upload", (req, res) => {
  console.log("Request to /firebase_upload");
  console.log(req.body);

  axios.post(process.env.FIREBASE_DATABASE_URL, req.body);
  res.send({ express: "SENDING POST REQUEST TO FIREBASE" });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
