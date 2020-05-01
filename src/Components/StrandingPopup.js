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
        <h3> {props.selectedStranding.properties["Common Name"]} </h3>
        <h2> {props.selectedStranding.properties["Date of Examination"]} </h2>
        <p> Age Class: {props.selectedStranding.properties["Age Class"]} </p>
        <p> Sex: {props.selectedStranding.properties["Sex"]} </p>
        <p>Latitude: {props.selectedStranding.geometry.coordinates[1]}</p>
        <p>Longitude: {props.selectedStranding.geometry.coordinates[0]}</p>
      </div>
    </Popup>
  );
};

export default StrandingPopup;
