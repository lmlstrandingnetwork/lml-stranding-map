// Import all needed modules.
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

// Set up Firestore.
admin.initializeApp();

// Set up Algolia.
const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);

// Set our Algolia index name
const index = algoliaClient.initIndex("strandings");

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

export const collectionOnUpdate = functions.database
  .ref("/features/{key}")
  .onUpdate(async (change, context) => {
    await updateDocumentInAlgolia(change);
  });

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
