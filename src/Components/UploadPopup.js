import React, { useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import api from "../api";
import "./UploadPopup.css";
import Papa from "papaparse";
import { AuthContext } from "../Auth";

const Popup = (props) => {
  const [featureCollection, setFeatureCollection] = useState([]);
  const [responseData, setResponseData] = useState("");
  const userToken = useContext(AuthContext).userToken;

  // handles closing the popup
  const handleClick = () => {
    props.toggle();
  };

  // send the parsed records to Firebase through the backend
  const uploadFeatureCollection = (e) => {
    e.preventDefault();
    featureCollection.forEach((element) =>
      api
        .uploadData({ record: element, userToken: userToken })
        .then((response) => {
          setResponseData(response);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  function getFamily(name) {
    var commonName = name.split(",")[0].trim();
    var Family = "Unknown";
    if (commonName === "Sea lion") {
      Family = "Otariid";
    } else if (commonName === "Seal") {
      Family = "Phocids";
    } else if (
      commonName === "Whale" ||
      commonName === "Dolphin" ||
      commonName === "Cetacean"
    ) {
      Family = "Odontocetes";
    }

    return Family;
  }

  // use papaparse to set up the csv
  function parseData(file, callBack) {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: function (results) {
        callBack(results.data);
      },
    });
  }

  // handle dropped file
  const onDrop = useCallback((acceptedFiles) => {
    var file = acceptedFiles[0];

    // convert .csv to geojson
    function toGeoJSON(data) {
      var features = [];

      data.forEach((element) => {
        var lat = parseFloat(element["Latitude"]);
        var long = element["Longitude"];
        long = parseFloat(long.replace(/\u2013|\u2014/g, "-"));
        var name = element["Common Name"];
        var uniqueid = element["National Database Number"];
        var family = getFamily(name);
        element.Family = family;

        var feature = {
          [uniqueid]: {
            type: "Feature",
            properties: element,
            geometry: { type: "Point", coordinates: [long, lat] },
          },
        };
        features.push(feature);
      });
      setFeatureCollection(features);
    }

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

  // display current accepted file
  const files = acceptedFiles.map((file) => (
    <p>
      {file.path} - {file.size} bytes
    </p>
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
            <span>{files}</span>
            <p>{featureCollection.length} records</p>

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
