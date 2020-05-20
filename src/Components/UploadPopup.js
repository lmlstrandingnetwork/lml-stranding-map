import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";
import api from "../api";
import "./UploadPopup.css";

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
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    var file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var fileContents = [];
        for (var i = 0; i < data.length; i++) {
          const attribute1 = data[i][0];
          const attribute2 = data[i][1];
          const item = {
            geometry: attribute1,
            properties: attribute2,
            type: "Feature",
          };
          fileContents.push(item);
        }
        setFeatureCollection(fileContents);
      });
    };

    reader.readAsBinaryString(file);
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
            <ul>{files}</ul>
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
