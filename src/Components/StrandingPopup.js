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
  const parseDomoicAcid = (props) => {
    let currStranding = props.selectedStranding.properties;
    let daPresent = currStranding["DA PRESENT IN AT LEAST ONE SAMPLE?"];
    // console.log(daPresent);
    if (daPresent === "Not Present") {
      return "No Data Available";
    }
    if (daPresent === "N") {
      return "Not Present";
    }
    if (daPresent === "Y") {
      let fecesAmount = currStranding["FECES (ng per g)"];
      if (fecesAmount === "N/A") fecesAmount = 0;
      fecesAmount = parseFloat(fecesAmount);

      let urineAmount = currStranding["URINE (ng per g)"];
      if (urineAmount === "N/A") urineAmount = 0;
      urineAmount = parseFloat(urineAmount);

      let stomachAmount = currStranding["STOMACH CONTENTS (ng per g)"];
      if (stomachAmount === "N/A") stomachAmount = 0;
      stomachAmount = parseFloat(stomachAmount);

      let maxAmount = Math.max(fecesAmount, urineAmount, stomachAmount).toFixed(3).toString();
      return maxAmount + " (ng/g)"
    }
    return daPresent;
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
        <p>
            <span className="highlight"> Domoic Acid: </span>{" "}
            {parseDomoicAcid(props)}{" "}
        </p>
      </div>
      </Popup>
    </div>
  );
};

export default StrandingPopup;
