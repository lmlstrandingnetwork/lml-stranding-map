import React from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";
import { connectRefinementList } from "react-instantsearch-dom";

const Legend = (props) => {
  const renderLegendItem = (item, i) => (
    <li key={i}>
      <MarkerSVG markerColor={props.speciesMarkers[item.label.split(",")[0]]} />
      <span>{item.label}</span>
      <span>{item.count}</span>
    </li>
  );

  return (
    <div className="legend">
      <ul>{props.items.map(renderLegendItem)}</ul>
    </div>
  );
};

export default connectRefinementList(Legend);
