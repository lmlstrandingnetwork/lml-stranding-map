import axios from "axios";

export default {
  uploadData: (data) => axios.post("/firebase_upload", data),

  searchAlgolia: (data) => axios.post("/algolia_search", data),
};
