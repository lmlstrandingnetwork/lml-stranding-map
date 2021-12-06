import React from "react";
import { Popup } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StrandingPopup.css";

const StrandingPopup = (props) => {
  const reverseName = (props) => {
    let name = props.selectedStranding.properties["Common Name"];
    let array = name.split(", ");
    let header = array.reverse().join(" ");
    return header[0].toUpperCase() + header.substr(1).toLowerCase();
  }
  // Formats the date in a more readable way
  const parseDate = (props) => {
      let date = props.selectedStranding.properties["Date of Examination"];
      if (date === undefined)
        return "Not available";
      let array = date.split("-");
      let result = "";
      if (array.length === 3)
        result = properCapitalization(array[1]) + " " + array[2] + ", " + array[0];
      else if (array.length === 2)
        result = properCapitalization(array[1]) + " , " + array[0];
      else
        result = properCapitalization(array[0]);
      return result;
  }
  // Expands the human interaction acronym
  const parseHumanInter = (props) => {
      let findings = props.selectedStranding.properties["Findings of Human Interaction"];
      if (findings === "Y") return "Yes";
      else if (findings === "N") return "No";
      else return "Cannot be determined";
  }
  // Expands the necropsied acronym
  const parseNecropsiedFlag = (props) => {
    let findings = props.selectedStranding.properties["Necropsied Flag"];
    return findings === "Y" ? "Yes" : "No";
  }
  // Checks if the locality is present in the data
  const parseLocality = (props) => {
    let locality = props.selectedStranding.properties["Locality Detail"];
    if (locality === undefined) return "Unavailable";
    return locality;
  }
  // takes in a string and returns it with proper capitalization
  // Ex: "HELLO WORLD" -> "Hello world"
  const properCapitalization = (str) => {
    return str ?
      str[0].toUpperCase() + str.substr(1).toLowerCase() : "N/A";
  }
  // Creates the html for the popup and returns
  return (
    <div className="wrapper">
      <Popup
        latitude={props.latitude}
        longitude={props.longitude}
        onClose={props.onClose}
        closeOnClick={false}
      >
      <div className="stranding-popup">
        <div className="bg-image">
            <h3 title={props.selectedStranding.properties["Field Number"]}>
              {reverseName(props)}
            </h3>
        </div>
        <h2>
            <span className="highlight"> Examination Date:</span>{" "}
            {parseDate(props)}
        </h2>
        <p>
            <span className="highlight"> Age Class:</span>{" "}
            {properCapitalization(props.selectedStranding.properties["Age Class"])}{" "}
        </p>
        <p>
            <span className="highlight"> Sex: </span>
            {properCapitalization(props.selectedStranding.properties["Sex"])}{" "}
        </p>
        <p>
          <span className="highlight"> Locality Detail: </span>
          <span className = "local">{parseLocality(props)}</span>{" "}
        </p>
        <p>
            <span className="highlight"> Human Interaction: </span>
            {parseHumanInter(props)}
        </p>
        <p>
            <span className="highlight"> Condition: </span>
            {props.selectedStranding.properties["Condition at Examination"]}{" "}
        </p>
        <p>
            <span className="highlight"> Necropsied Flag: </span>{" "}
            {parseNecropsiedFlag(props)}{" "}
        </p>
      </div>
      </Popup>

      {/* Case study popup, only show if "Case Study" property is true */}
      {props.selectedStranding.properties["Case Study"] ?
      <Popup
        className="case-study"
        closeButton={false}
        closeOnClick={false}
        latitude={props.latitude}
        longitude={props.longitude}
        /* Offset longitude to display case study popup to the right of stranding popup */
        offset={[225, 0]}
      >
        <div className="case-study-header">
            <h3>Stranding Story</h3>
        </div>
        <div>
          {/* Check for "Photo" property, display if it exists" */}
          {props.selectedStranding.properties["Photo"] ?
            <img
            className="case-study-photo"
            src={props.selectedStranding.properties["Photo"]}
            alt={"Photo of stranded mammal " + props.selectedStranding.properties["Field Number"]}
            /> :
            /* If "Photo" property not present, use placeholder image */
            <img
            className="case-study-photo"
            src="https://firebasestorage.googleapis.com/v0/b/lml-stranding-map.appspot.com/o/4a5b602a3824f7e8253f1f4b0a94d324.jpg?alt=media&token=905c60f7-ddc1-4fac-894b-cd36bcad79fd"
            height="100px"
            alt="Placeholder, img of mammal unavailable"
            />
          }
        </div>
        {/* Display one sentence "Case Study Summary" */}
        <p className="case-study-summary">
          {props.selectedStranding.properties["Case Study Summary"]}
        </p>
        {/* Link to case study page using National Database Number */}
        <a
          href={'/stranding/' + props.selectedStranding.properties["National Database Number"]}
          target="_blank"             // opens link in new tab
          rel="noopener noreferrer"   // gets rid of eslint warning
        >
          <button className="case-study-button">
            Read More
          </button>
        </a>
        <br />
      </Popup> : <span />}
    </div>
  );
};

export default StrandingPopup;
