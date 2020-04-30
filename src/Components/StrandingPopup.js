import React from "react";
import { Popup } from "react-map-gl";

const StrandingPopup = (props) => {
  return (
    <Popup
      latitude={props.latitude}
      longitude={props.longitude}
      onClose={props.onClose}
      closeOnClick={true}
    >
      <div>
        <h2> {props.selectedStranding.properties["Common Name"]} </h2>
        <p> {props.selectedStranding.properties["Date of Examination"]} </p>
        <p> {props.selectedStranding.properties["Age Class"]} </p>
        <p> {props.selectedStranding.properties["Sex"]} </p>
        <p>Latitude: {props.selectedStranding.geometry.coordinates[1]}</p>
        <p>Longitude: {props.selectedStranding.geometry.coordinates[0]}</p>
      </div>
    </Popup>
  );
};

export default StrandingPopup;
