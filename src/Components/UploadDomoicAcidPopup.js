import React, { useCallback, useState, useContext, useEffect } from "react";
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
  let allFeatures = null;


  useEffect(() => {
    api
      .getFeatures()
      .then((response) => {
        allFeatures=response.data;
        console.log(allFeatures);
        //setCaseStudy(response.data.properties);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [""]); 
  
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
    function matchWithExistingRecord(data) {
      var features = [];

      // console.log(allFeatures);

      for(let nationalNumber in allFeatures) { //if database entries do not initially contain DA data, fill in now
        const possibleMatch = allFeatures[nationalNumber];
        if(!possibleMatch.properties["DA PRESENT IN AT LEAST ONE SAMPLE?"]){
          possibleMatch.properties["DA PRESENT IN AT LEAST ONE SAMPLE?"] = "Not Tested";
          possibleMatch.properties["FECES (ng per g)"] = "N/A";
          possibleMatch.properties["URINE (ng per g)"] = "N/A";
          possibleMatch.properties["STOMACH CONTENTS (ng per g)"] = "N/A";
          possibleMatch.properties["DA BUCKET (ng per g)"] = "N/A";
          const feature = {
            [nationalNumber]: possibleMatch
          };
          features.push(feature);
          // console.log("DA data not found");
        }else{
          // console.log("DA data found");
        }
      }

      data.forEach((element) => {
        removeEmptyColumns(element);
        
        // pull and parse the longitude and latitude from the data
        //FIELD #	DA PRESENT IN AT LEAST ONE SAMPLE?	FECES (ng/g)	URINE (ng/g)	STOMACH CONTENTS (ng/g)

        // pull the other info from the data
        const fieldNum = element["FIELD #"];
        const DA_PRESENT = element["DA PRESENT IN AT LEAST ONE SAMPLE?"];
        const feces = element["FECES (ng/g)"];
        const urine = element["URINE (ng/g)"];
        const stomach_contents = element["STOMACH CONTENTS (ng/g)"];

        for(let nationalNumber in allFeatures) {
          const possibleMatch = allFeatures[nationalNumber];
          if (possibleMatch.properties["Field Number"] === fieldNum){
            possibleMatch.properties["DA PRESENT IN AT LEAST ONE SAMPLE?"] = DA_PRESENT;
            possibleMatch.properties["FECES (ng per g)"] = feces;
            possibleMatch.properties["URINE (ng per g)"] = urine;
            possibleMatch.properties["STOMACH CONTENTS (ng per g)"] = stomach_contents;
            let fecesAmount = feces;
            if (fecesAmount == "N/A") fecesAmount = 0;
            fecesAmount = parseFloat(fecesAmount);

            let urineAmount = urine;
            if (urineAmount == "N/A") urineAmount = 0;
            urineAmount = parseFloat(urineAmount);

            let stomachAmount = stomach_contents;
            if (stomachAmount == "N/A") stomachAmount = 0;
            stomachAmount = parseFloat(stomachAmount);

            let maxAmount = Math.max(fecesAmount, urineAmount, stomachAmount);
            possibleMatch.properties["Maximum Domoic Acid (ng per g)"] = maxAmount;


            // match max domoic acid to bucket on logorithmic scale
            let bucketsArray = [0, 1, 10, 100, 1000, 10000, 100000]; // set up buckets
            let bucket = bucketsArray.find(num => num >= maxAmount); // outputs upper end of bucket (50.6 -> 100)
            possibleMatch.properties["DA BUCKET (ng per g)"] = bucket;

            const feature = {
              [nationalNumber]: possibleMatch
            };
            features.push(feature);
          }
        };
        
      });

      setFeatureCollection(features);
      //setMissingLatLongCollection(missingLatLong);
      //setMissingYearCollection(missingYear);
    };

    parseData(file, matchWithExistingRecord);
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
    // featureCollection.map((record) => console.log(record));
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
