import axios from "axios";

export default {
  uploadData: (data) => axios.post("/firebase_upload", data),
};
