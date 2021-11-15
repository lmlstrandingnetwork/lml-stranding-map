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
  const parseHumanInter = (props) => {
      let findings = props.selectedStranding.properties["Findings of Human Interaction"];
      if (findings === "Y") return "Yes";
      else if (findings === "N") return "No";
      else return "Cannot be determined";
  }
  const parseNecropsiedFlag = (props) => {
    let findings = props.selectedStranding.properties["Necropsied Flag"];
    return findings === "Y" ? "Yes" : "No";
  }
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
  return (
    <div className="wrapper">
      <Popup
        latitude={props.latitude}
        longitude={props.longitude}
        onClose={props.onClose}
        closeOnClick={true}
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
      {/* Case study popup */}
      {props.selectedStranding.properties["Case Study"] ?
      <Popup
        className="case-study"
        closeButton={true}
        closeOnClick={true}
        latitude={props.latitude}
        longitude={props.longitude}
        offset={[225, 0]}
      >
        <div className="case-study-header">
            <h3> Case Study </h3>
        </div>
        <div>
          {props.selectedStranding.properties["Photo"] ?
            <img
            className="case-study-photo"
            src={props.selectedStranding.properties["Photo"]}
            height="100px"
            /> :
            <img
            className="case-study-photo"
            src="https://firebasestorage.googleapis.com/v0/b/lml-stranding-map.appspot.com/o/4a5b602a3824f7e8253f1f4b0a94d324.jpg?alt=media&token=905c60f7-ddc1-4fac-894b-cd36bcad79fd"
            height="100px"
            />
          }
        </div> 
        <p className="case-study-summary">
          {props.selectedStranding.properties["Case Study Summary"]}
        </p>
        <button className="case-study-button">
          Read More
        </button>
        <br />
      </Popup> : <span />}
    </div>
  );
};

export default StrandingPopup;
