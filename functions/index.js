// Import all needed modules.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as algoliasearch from "algoliasearch";

// Set up Firestore.
admin.initializeApp();
const db = admin.firestore();

// Set up Algolia.
// The app id and API key are coming from the cloud functions environment, as we set up in Part 1, Step 3.
const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);
// Since I'm using develop and production environments, I'm automatically defining
// the index name according to which environment is running. functions.config().projectId is a default
// property set by Cloud Functions.
const collectionIndexName =
  functions.config().projectId === "sos-data-viz" ? "strandings" : "strandings";
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

// Create a HTTP request cloud function.
export const sendCollectionToAlgolia = functions.https.onRequest(
  async (req, res) => {
    // This array will contain all records to be indexed in Algolia.
    // A record does not need to necessarily contain all properties of the Firestore document,
    // only the relevant ones.
    const algoliaRecords: any[] = [];

    // Retrieve all documents from the COLLECTION collection.
    const querySnapshot = await db.collection("features").get();

    querySnapshot.docs.forEach((doc) => {
      const document = doc.data();
      // Essentially, you want your records to contain any information that facilitates search,
      // display, filtering, or relevance. Otherwise, you can leave it out.
      const record = {
        objectID: doc.id,
        relevantProperty1: document.relevantProperty1,
        relevantProperty2: document.relevantProperty2,
        relevantPropertyN: document.relevantPropertyN,
      };

      algoliaRecords.push(record);
    });

    // After all records are created, we save them to
    collectionIndex.saveObjects(algoliaRecords, (_error: any, content: any) => {
      res
        .status(200)
        .send("Features collection was indexed to Algolia successfully.");
    });
  }
);
