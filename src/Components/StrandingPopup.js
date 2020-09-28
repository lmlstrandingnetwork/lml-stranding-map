import React from "react";
import { Popup } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StrandingPopup.css";

const StrandingPopup = (props) => {
  return (
    <Popup
      latitude={props.latitude}
      longitude={props.longitude}
      onClose={props.onClose}
      closeOnClick={true}
    >
      <div className="stranding-popup">
        <div className="bg-image">
          <h3> {props.selectedStranding.properties["Common Name"]} </h3>
        </div>
        <h2> {props.selectedStranding.properties["Field Number"]} </h2>
        <p>
          <span className="highlight"> Date of Examination:</span>{" "}
          {props.selectedStranding.properties["Date of Examination"]}{" "}
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
          <span className="highlight"> Findings of Human Interaction: </span>
          {
            props.selectedStranding.properties["Findings of Human Interaction"]
          }{" "}
        </p>
        <p>
          <span className="highlight"> Condition at Examination: </span>
          {props.selectedStranding.properties["Condition at Examination"]}{" "}
        </p>
        <p>
          <span className="highlight"> Necropsied Flag: </span>{" "}
          {props.selectedStranding.properties["Necropsied Flag"]}{" "}
        </p>
      </div>
    </Popup>
  );
};

export default StrandingPopup;
