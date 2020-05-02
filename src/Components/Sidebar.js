import React from "react";
import { orderBy } from "lodash";
import DropdownRefinementList from "./DropdownRefinementList";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="left-column">
      <ToggleSwitch 
        heatmapState={props.heatmapState}
        showHeatmap={props.showHeatmap}
        toggleState={props.toggleState}
        setToggleState={props.setToggleState}
      />
      <DropdownRefinementList
        hoverable
        attribute={"properties.Common Name"}
        limit={50}
        transformItems={(items) => orderBy(items, "label", "asc")}
      />
      <DropdownRefinementList
        hoverable
        attribute={"properties.Year of Examination"}
        limit={50}
        transformItems={(items) => orderBy(items, "label", "asc")}
      />
      <DropdownRefinementList hoverable attribute={"properties.Sex"} />
    </div>
  );
};

const ToggleSwitch = (props) => {
  return (
    <div className={`ToggleSwitch ${props.toggleState}`} onClick={props.showHeatmap} />
  );
};

export default Sidebar;
