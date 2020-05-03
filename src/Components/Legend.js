import React from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";

const Legend = (props) => {
  return (
    <div className="legend">
      {Object.keys(props.speciesMarkers).map((species) => (
        <li style={{ listStyle: "none" }}>
          <MarkerSVG speciesMarkers={props.speciesMarkers} species={species.toString()}/>
          {species}
        </li>
      ))}
    </div>
  );
};

export default Legend;
