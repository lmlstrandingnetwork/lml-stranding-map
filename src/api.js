import axios from "axios";

const firebase_upload = "/functions/server/firebase_upload";
const algolia_search = "/functions/server/algolia_search";

export default {
  uploadData: (data) => axios.post(firebase_upload, data),

  searchAlgolia: (data) => axios.post(algolia_search, data),
};
