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

// functions.config().projectId is a default property set by Cloud Functions.
const collectionIndexName = functions.config().projectId;
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
    collectionIndex.saveObjects(algoliaRecords, (_error: any, content: any) => {
      res
        .status(200)
        .send("Features collection was indexed to Algolia successfully.");
    });
  }
);

export const databaseOnDelete = functions.database
  .ref("/features")
  .onDelete(async (snapshot, context) => {
    await deleteDocumentFromAlgolia(snapshot);
  });

async function deleteDocumentFromAlgolia(
  snapshot: functions.database.DataSnapshot
) {
  if (snapshot.exists()) {
    const objectID = snapshot.key;
    await collectionIndex.deleteObject(objectID);
  }
}

export const databaseOnCreate = functions.database
  .ref("/features")
  .onCreate(async (snapshot, context) => {
    await saveDocumentInAlgolia(snapshot);
  });

async function saveDocumentInAlgolia(snapshot: any) {
  if (snapshot.exists()) {
    const record = snapshot.data();
    if (record) {
      // Removes the possibility of snapshot.data() being undefined.
      if (record.isIncomplete === false) {
        // We only index products that are complete.
        record.objectID = snapshot.id;

        // In this example, we are including all properties of the Firestore document
        // in the Algolia record, but do remember to evaluate if they are all necessary.

        await collectionIndex.saveObject(record); // Adds or replaces a specific object.
      }
    }
  }
}
