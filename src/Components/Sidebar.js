import React, { useState, useEffect, useContext } from "react";
import { orderBy } from "lodash";
import DropdownRefinementList from "./DropdownRefinementList";
import { PoweredBy } from "react-instantsearch-dom";
import UploadPopup from "./UploadPopup";
import { AuthContext } from "../Auth";
import "./Sidebar.css";

const reducer = (isComponentHidden, action) => {
  switch (action.type) {
    case "show":
      return false;
    case "hide":
      return true;
    default:
      return isComponentHidden;
  }
};

const Sidebar = (props) => {
  const [isUploadPopupHidden, dispatchUploadPopup] = React.useReducer(
    reducer,
    true
  );

  const userContext = useContext(AuthContext);
  const [isUploadButtonHidden, setIsUploadButtonHidden] = useState(true);

  useEffect(() => {
    if (userContext.currentUser != null) {
      setIsUploadButtonHidden(false);
    }
  }, []);

  function showUploadPopup() {
    if (isUploadPopupHidden === true) {
      dispatchUploadPopup({ type: "show" });
    } else {
      dispatchUploadPopup({ type: "hide" });
    }
  }

  return (
    <div className={"sidebar" + (props.isSidebarHidden ? "_hidden" : "")}>
      <div className="toggles-container">
        <ToggleSwitch label={"Heatmap"} toggleComponent={props.showHeatmap} />
        <ToggleSwitch
          label={"Time Slider"}
          toggleComponent={props.showTimeSlider}
        />
        {isUploadButtonHidden ? null : (
          <button className="uploadButton" onClick={showUploadPopup}>
            Upload a file
          </button>
        )}
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

      <DropdownRefinementList
        attribute={"properties.Findings of Human Interaction"}
      />
      <DropdownRefinementList
        attribute={"properties.Condition at Examination"}
      />
      <DropdownRefinementList attribute={"properties.Necropsied Flag"} />
      <div style={{ padding: "18px" }}>
        <PoweredBy />
      </div>
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
