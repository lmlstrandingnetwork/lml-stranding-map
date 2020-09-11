import React, { useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import api from "../api";
import "./UploadPopup.css";
import Papa from "papaparse";
import { AuthContext } from "../Auth";
import { ProgressBar } from "react-bootstrap";
import { CSVLink } from "react-csv";

const Popup = (props) => {
  const [featureCollection, setFeatureCollection] = useState([]);
  const [responseData, setResponseData] = useState("");
  const [percentLoaded, setPercentLoaded] = useState("");
  const userToken = useContext(AuthContext).userToken;

  // handles closing the popup
  const handleClick = () => {
    props.toggle();
  };

  // send with api call
  // axios will call this function when upload progresses
  var config = {
    onUploadProgress: (progressEvent) => {
      setPercentLoaded(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
      console.log(percentLoaded);
    },
  };

  // send the parsed records to Firebase through the backend
  const uploadFeatureCollection = (e) => {
    e.preventDefault();
    featureCollection.forEach((element) =>
      api
        .uploadData({ record: element, userToken: userToken }, config)
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
    <p className="fileName">{file.path}</p>
  ));

  // display each record to be uploaded
  const RecordCards = () => {
    featureCollection.map((record) => console.log(Object.keys(record)[0]));
    return (
      <div>
        {featureCollection.map((record) => (
          <div>
            <p className="recordID">{Object.keys(record)[0]}</p>
            <ProgressBar
              style={{ marginbottom: "10px", height: "5px" }}
              now={percentLoaded}
            />
          </div>
        ))}
      </div>
    );
  };

  // upload template csv for download
  const csvTemplate = [
    [
      "National Database Number",
      "Field Number",
      "Common Name",
      "Affiliation",
      "Latitude",
      "Latitude Units",
      "Longitude",
      "Longitude Units",
      "Findings of Human Interaction",
      "Date of Examination",
      "Year of Examination",
      "Condition at Examination",
      "Sex",
      "Age Class",
      "Length",
      "Length Units",
      "Necropsied Flag",
    ],
    [
      "SW-2005-1060399",
      "LMLZC05NOV2005",
      "Sea lion, California",
      "Long Marine Laboratory",
      36.9513286,
      "decimal degrees",
      -122.0655682,
      "decimal degrees",
      "CBD",
      "2005-NOV-05",
      "2005",
      "Fresh dead",
      "MALE",
      "SUBADULT",
      180,
      "cm",
      "N",
    ],
  ];

  return (
    <div className="popup">
      <div className="popup_content">
        <div className="popupTitleBar">
          <span className="close" onClick={handleClick}>
            &times;{" "}
          </span>
          <h3>File Upload</h3>
          <hr></hr>
        </div>
        <div className="mainPopupContent">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {!isDragActive && "Click here or drop a file to upload"}
            {isDragActive && !isDragReject && "Drop to upload"}
            {isDragReject && "File type not accepted, sorry!"}
          </div>
          <div className="fileContent">
            <div className="fileDetail">
              <span>{files}</span>
              <p className="subtitle">
                {featureCollection.length} records selected
              </p>
            </div>
            <div className="recordContent">
              <RecordCards />
            </div>
            <div className="uploadButtonContent">
              <button
                className="uploadButton2"
                onClick={uploadFeatureCollection}
              >
                Upload
              </button>
              <CSVLink
                data={csvTemplate}
                filename={"stranding-report-template.csv"}
              >
                Download CSV template
              </CSVLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
