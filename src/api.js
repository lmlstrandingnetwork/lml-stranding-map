import axios from "axios";

const firebaseFunctionURL =
  "https://us-central1-lml-stranding-map.cloudfunctions.net/api/firebaseupload";
const firebaseFeaturesURL =
  "https://lml-stranding-map.firebaseio.com/features/";
const algoliaURL =
  "https://us-central1-lml-stranding-map.cloudfunctions.net/api/algoliasearch";

export default {
  uploadData: (data, config) =>
    axios.post(firebaseFunctionURL, data, config).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        return error;
      }
    ),
  // pass in National Database Number of the case you want to retrieve from Firebase
  getStranding: (databaseid) =>
      axios.get(firebaseFeaturesURL + databaseid + ".json").then(
        (response) => {
          return response;
        },
        (error) => {
          console.log(error);
        }
      ),

  searchAlgolia: (data) => axios.post(algoliaURL, data),
};
