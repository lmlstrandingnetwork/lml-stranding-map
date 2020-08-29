import axios from "axios";

const firebaseURL =
  "https://us-central1-lml-stranding-map.cloudfunctions.net/api/firebaseupload";
const algoliaURL =
  "https://us-central1-lml-stranding-map.cloudfunctions.net/api/algoliasearch";

export default {
  uploadData: (data, config) =>
    axios.post(firebaseURL, data, config).then(
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
