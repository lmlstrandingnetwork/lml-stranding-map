import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "../api";
import "./UploadPopup.css";
import Papa from "papaparse";

const Popup = (props) => {
  const [featureCollection, setFeatureCollection] = useState([]);
  const [responseData, setResponseData] = useState("");

  const handleClick = () => {
    props.toggle();
  };

  const uploadFeatureCollection = (e) => {
    e.preventDefault();
    featureCollection.forEach((element) =>
      api
        .uploadData(element)
        .then((response) => {
          setResponseData(response.data);
          console.log(responseData);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  function toGeoJSON(data) {
    var features = [];

    data.forEach((element) => {
      var lat = element["Latitude"];
      var long = element["Longitude"];
      var feature = {
        type: "Feature",
        properties: element,
        geometry: { type: "Point", coordinates: [long, lat] },
      };
      features.push(feature);
    });

    setFeatureCollection(features);
  }

  function parseData(file, callBack) {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: function (results) {
        callBack(results.data);
      },
    });
  }

  const onDrop = useCallback((acceptedFiles) => {
    var file = acceptedFiles[0];

    parseData(file, toGeoJSON);
  }, []);

  const {
    acceptedFiles,
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ["text/csv", "application/json"],
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="popup">
      <div className="popup_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>

        <section className="container text-center mt-5">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {!isDragActive && "Click here or drop a .csv/.json file to upload!"}
            {isDragActive && !isDragReject && "Drop to upload!"}
            {isDragReject && "File type not accepted, sorry!"}
          </div>
          <aside>
            <h5>Selected file:</h5>
            <span>{files}</span>
            <h7>{featureCollection.length} records</h7>

            {files.length > 0 && (
              <button
                className="uploadButton2"
                onClick={uploadFeatureCollection}
              >
                Upload
              </button>
            )}
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Popup;
