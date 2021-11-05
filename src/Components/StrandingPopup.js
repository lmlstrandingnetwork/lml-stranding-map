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
        result = array[1].toUpperCase() + " " + array[2] + ", " + array[0];
      else if (array.length === 2)
        result = array[1].toUpperCase() + " , " + array[0];
      else
        result = array[0].toUpperCase();
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
  return (
      <Popup
        latitude={props.latitude}
        longitude={props.longitude}
        onClose={props.onClose}
        closeOnClick={true}
      >
        <div className="stranding-popup">
        <div className="bg-image">
            <h3> {reverseName(props)} </h3>
        </div>
        <h2>
            {props.selectedStranding.properties["Field Number"]}
        </h2>
        <p>
            <span className="highlight"> Examination Date:</span>{" "}
            {parseDate(props)}{" "}
        </p>
        <p>
            <span className="highlight"> Age Class:</span>{" "}
            {props.selectedStranding.properties["Age Class"]}{" "}
        </p>
        <p>
            <span className="highlight"> Sex: </span>
            {props.selectedStranding.properties["Sex"]}{" "}
        </p>
        <p>
            <span className="highlight"> Latitude: </span>
            {props.selectedStranding.geometry.coordinates[1]}
        </p>
        <p>
            <span className="highlight"> Longitude: </span>
            {props.selectedStranding.geometry.coordinates[0]}
        </p>
        <p>
            <span className="highlight"> Human Interaction: </span>
            {parseHumanInter(props)}{" "}
        </p>
        <p>
            <span className="highlight"> Condition at Examination: </span>
            {props.selectedStranding.properties["Condition at Examination"]}{" "}
        </p>
        <p>
            <span className="highlight"> Necropsied Flag: </span>{" "}
            {parseNecropsiedFlag(props)}{" "}
        </p>
        </div>
      </Popup>
  );
};

export default StrandingPopup;
