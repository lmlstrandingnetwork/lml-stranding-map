import React from "react";
import { orderBy } from "lodash";
import DropdownRefinementList from "./DropdownRefinementList";

const Sidebar = (props) => {
  return (
    <div className="left-column">
      <ToggleHeatmapButton
        heatmapState={props.heatmapState}
        showHeatmap={props.showHeatmap}
        toggleButtonText={props.toggleButtonText}
        setTButtonText={props.toggleButtonText}
      />
      <DropdownRefinementList
        attribute={"properties.Common Name"}
        limit={50}
        transformItems={(items) => orderBy(items, "label", "asc")}
      />
      <DropdownRefinementList
        attribute={"properties.Year of Examination"}
        limit={50}
        transformItems={(items) => orderBy(items, "label", "asc")}
      />
      <DropdownRefinementList attribute={"properties.Sex"} />
    </div>
  );
};

const ToggleHeatmapButton = (props) => {
  return (
    <button
      style={{ fontSize: "15px", margin: "10px 24px" }}
      onClick={props.showHeatmap}
    >
      {props.toggleButtonText}
    </button>
  );
};

export default Sidebar;
