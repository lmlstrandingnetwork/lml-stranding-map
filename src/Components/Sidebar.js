import React, { useState } from "react";
import { orderBy } from "lodash";
import DropdownRefinementList from "./DropdownRefinementList";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div className={"sidebar" + (props.isSidebarHidden ? "_hidden" : "")}>
      <div className="toggles-container">
        <ToggleSwitch label={"Heatmap"} toggleComponent={props.showHeatmap} />
        <ToggleSwitch
          label={"Time Slider"}
          toggleComponent={props.showTimeSlider}
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
        defaultRefinement={"2019"}
        transformItems={(items) => orderBy(items, "label", "desc")}
      />
      <DropdownRefinementList attribute={"properties.Sex"} />

      <DropdownRefinementList attribute={"properties.Findings of Human Interaction"} />
      <DropdownRefinementList attribute={"properties.Condition at Examination"} />
      <DropdownRefinementList attribute={"properties.Necropsied Flag"} />


    </div>
  );
};

const ToggleSwitch = (props) => {
  const [toggleState, setToggleState] = useState("off");

  const handleClick = () => {
    props.toggleComponent();

    if (toggleState === "off") {
      setToggleState("on");
    } else {
      setToggleState("off");
    }
  };

  return (
    <div>
      <label> {props.label} </label>
      <div className={`ToggleSwitch ${toggleState}`} onClick={handleClick} />
    </div>
  );
};

export default Sidebar;
