// Import all needed modules.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

// Initialize Firebase.
admin.initializeApp();

// Initialize Algolia.
const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);

// Set Algolia index name.
const index = algoliaClient.initIndex("strandings");

// Initialize Express server.
const app = express();

// Set JSON as bodyParser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add CORS middleware
app.use(cors({ origin: true }));

// Define Express server as Firebase Function
export const api = functions.https.onRequest(app);

// GET endpoint for testing
app.get("/hello", async (req, res) => {
  try {
    res.status(201).send(`Hello from Firebase!`);
  } catch (error) {
    res.status(400).send(`Error`);
  }
});

// POST route to retrieve Algolia results
app.post("/algoliasearch", async (req, res) => {
  try {
    index.search("", req.body).then(({ hits }) => {
      res.send(hits);
    });
  } catch (error) {
    res.status(400).send(`Failed to retreive Algolia results`);
  }
});

// Database functions
export const databaseOnCreate = functions.database
  .ref("/features/{key}")
  .onCreate(async (snapshot: any, context: any) => {
    console.log(snapshot);
    await saveDocumentInAlgolia(snapshot);
  });

export const databaseOnDelete = functions.database
  .ref("/features/{key}")
  .onDelete(async (snapshot: any, context: any) => {
    await deleteDocumentFromAlgolia(snapshot);
  });

export const databaseOnUpdate = functions.database
  .ref("/features/{key}")
  .onUpdate(async (change) => {
    await updateDocumentInAlgolia(change);
  });

// Database helper functions
async function saveDocumentInAlgolia(snapshot: any) {
  console.log("adding record to Algolia");
  if (snapshot.exists()) {
    const record = snapshot.val();
    if (record) {
      record.objectID = snapshot.key;
      console.log(record);

      await index.saveObject(record);
    }
  }
}

async function deleteDocumentFromAlgolia(snapshot: any) {
  if (snapshot.exists()) {
    console.log("deleting record from Algolia");
    const objectID = snapshot.key;

    await index.deleteObject(objectID);
  }
}

async function updateDocumentInAlgolia(
  change: functions.Change<functions.database.DataSnapshot>
) {
  const docBeforeChange = change.before;
  const docAfterChange = change.after;
  if (docBeforeChange && docAfterChange) {
    await deleteDocumentFromAlgolia(change.before);
    await saveDocumentInAlgolia(change.after);
  }
}
