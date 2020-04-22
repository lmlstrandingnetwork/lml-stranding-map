// Import all needed modules.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

// Set up Firestore.
admin.initializeApp();
const db = admin.firestore();

// Set up Algolia.
const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);

// Set our Algolia index name
const index = algoliaClient.initIndex("strandings");

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
      // const record = {
      //   objectID: doc.id,
      //   relevantProperty1: document.relevantProperty1,
      //   relevantProperty2: document.relevantProperty2,
      //   relevantPropertyN: document.relevantPropertyN,
      //  };
      // algoliaRecords.push(record);
      algoliaRecords.push(document);
    });

    // After all records are created, we save them to
    index.saveObjects(algoliaRecords, (_error: any, content: any) => {
      res
        .status(200)
        .send("Features collection was indexed to Algolia successfully.");
    });
  }
);

export const databaseOnCreate = functions.database
  .ref("/features/{key}")
  .onCreate(async (snapshot, context) => {
    console.log(snapshot);
    await saveDocumentInAlgolia(snapshot);
  });

async function saveDocumentInAlgolia(snapshot: any) {
  console.log("sending to Algolia");
  if (snapshot.exists()) {
    const record = snapshot.val();
    if (record) {
      record.objectID = snapshot.key;
      console.log(record);

      await index.saveObject(record);
    }
  }
}
