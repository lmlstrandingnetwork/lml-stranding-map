import axios from "axios";

export default {
  uploadData: (data) =>
    axios.post(process.env.REACT_APP_FIREBASE_DATABASE_URL, {
      data,
    }),
};
