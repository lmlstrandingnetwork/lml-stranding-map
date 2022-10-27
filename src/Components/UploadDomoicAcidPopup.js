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
  const [missingLatLongCollection, setMissingLatLongCollection] = useState([]);
  const [missingYearCollection, setMissingYearCollection] = useState([]);
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
  
  // based on the common name, return the family name
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

  function removeEmptyColumns(obj) {
    Object.keys(obj).forEach(key => key === "" && delete obj[key]);
  };
  // use papaparse to set up the csv
  function parseData(file, callBack) {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: function (results) {
        callBack(results.data);
      },
      skipEmptyLines: "greedy"
    });
  }

  // handle dropped file
  const onDrop = useCallback((acceptedFiles) => {
    var file = acceptedFiles[0];

    // convert .csv to geojson
    function toGeoJSON(data) {
      var features = [];
      var missingLatLong = [];
      var missingYear = [];

      data.forEach((element) => {
        removeEmptyColumns(element);
        var validRecord = true;
        
        // store records without latitude or longitude
        if (!element["Latitude"] || !element["Longitude"]) {
          missingLatLong.push(element["National Database Number"]);
          validRecord = false;
        }
        // store records without Year of Examination
        if (!element["Year of Examination"]) {
          missingYear.push(element["National Database Number"]);
          validRecord = false;
        }
        // skip records that are missing latitude, longitude, or year of examination
        if (!validRecord) return;
        // pull and parse the longitude and latitude from the data
        var lat = parseFloat(element["Latitude"]);
        var long = element["Longitude"];
        long = long[0] === '-' ?
          parseFloat(long) : parseFloat(long.replace(/\u2013|\u2014/g, "-"));
        // pull the other info from the data
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
      setMissingLatLongCollection(missingLatLong);
      setMissingYearCollection(missingYear);
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
    accept: [
      ".csv",
      "application/vnd.ms-excel",
      "text/csv",
      "application/json",
    ],
  });

  // display current accepted file
  const files = acceptedFiles.map((file) => (
    <p className="fileName">{file.path}</p>
  ));

  // display records with missing fields
  const InvalidRecords = () => {
    return (
      <div>
        <div className="subtitle">
          {missingLatLongCollection.length} records missing Latitude/Longitude
        </div>
        {missingLatLongCollection.map((record) => (
          <div>
            <p className="recordID">{record}</p>
          </div>
        ))}
        <div className="subtitle">
          {missingYearCollection.length} records missing Year of Examination
        </div>
        {missingYearCollection.map((record) => (
          <div>
            <p className="recordID">{record}</p>
          </div>
        ))}
      </div>
    );
  };

  // display each record to be uploaded
  const RecordCards = () => {
    featureCollection.map((record) => console.log(record));
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
      "Genus",
      "Species",
      "Affiliation",
      "Country",
      "County",
      "City",
      "State",
      "Locality Detail",
      "Latitude",
      "Longitude",
      "Findings of Human Interaction",
      "Date of Examination",
      "Year of Examination",
      "Condition at Examination",
      "Sex",
      "Age Class",
      "Necropsied Flag",
    ],
    [
      "SW-2005-1060399",
      "LMLZC05NOV2005",
      "Sea lion, California",
      "Zalophus",
      "californianus",
      "Long Marine Laboratory",
      "United States",
      "SANTA CRUZ",
      "Santa Cruz",
      "CA",
      "EAST END OF ITS BEACH",
      36.9513286,
      -122.0655682,
      "CBD",
      "2005-NOV-05",
      "2005",
      "Fresh dead",
      "MALE",
      "SUBADULT",
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
          <h3>Domoic Acid Data File Upload</h3>
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
            </div>
            {(missingLatLongCollection.length > 0 || missingYearCollection.length > 0) && 
            <div className="invalidRecordContent">
              <InvalidRecords />
            </div>}
            <div className="subtitle">
              {featureCollection.length} valid records selected
            </div>
            <div className="recordContent">
              <RecordCards />
            </div>
            <div className="uploadButtonContent">
              {featureCollection.length > 0 ?
              <button
                className="uploadButton2"
                onClick={uploadFeatureCollection}
              >
                Upload
              </button> :
              <button
                disabled
                className="uploadButtonDisabled"
                onClick={uploadFeatureCollection}
              >
                Upload
              </button>}
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
