import axios from "axios";

const firebaseURL = "/.netlify/functions/server/firebase_upload";
const algoliaURL =
  "https://us-central1-lml-stranding-map.cloudfunctions.net/webApi/api/algoliasearch";

export default {
  uploadData: (data) =>
    axios.post(firebaseURL, data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        return error;
      }
    ),

  searchAlgolia: (data) => axios.post(algoliaURL, data),
};
