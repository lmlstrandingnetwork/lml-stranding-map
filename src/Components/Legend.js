import React from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";

const Legend = (props) => {
  return (
    <div className="legend">
      <ul>
        {Object.keys(props.speciesMarkers).map((species) => (
          <li key={Object.keys(props.speciesMarkers).indexOf(species)}>
            <MarkerSVG markerColor={props.speciesMarkers[species]} />
            {species}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
