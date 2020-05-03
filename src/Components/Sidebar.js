import React from "react";
import { orderBy } from "lodash";
import DropdownRefinementList from "./DropdownRefinementList";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="left-column">
      <div className="Heatmap-control" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }} >
      <div className="toggle-label"> Heat Map Toggle</div>
        <ToggleSwitch 
          heatmapState={props.heatmapState}
          showHeatmap={props.showHeatmap}
          toggleState={props.toggleState}
          setToggleState={props.setToggleState}
        />
      </div>
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

const ToggleSwitch = (props) => {
  return (
    <div className={`ToggleSwitch ${props.toggleState}`} onClick={props.showHeatmap} />
  );
};

export default Sidebar;
