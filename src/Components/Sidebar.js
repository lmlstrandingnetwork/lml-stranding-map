import React, { useState, useEffect, useContext } from "react";
import { orderBy } from "lodash";
import DropdownRefinementList from "./DropdownRefinementList";
import { Panel, PoweredBy } from "react-instantsearch-dom";
import UploadPopup from "./UploadPopup";
import UploadDomoicAcidPopup from "./UploadDomoicAcidPopup";
import { AuthContext } from "../Auth";
import "./Sidebar.css";
import CustomRangeSlider from "./CustomRangeSlider"

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

  const [isDAUploadPopupHidden, dispatchDAUploadPopup] = React.useReducer(
    reducer,
    true
  );

  const userContext = useContext(AuthContext);
  const [isUploadButtonHidden, setIsUploadButtonHidden] = useState(true);

  useEffect(() => {
    if (userContext.currentUser != null) {
      setIsUploadButtonHidden(false);
    }
  }, [userContext.currentUser]);

  function showUploadPopup() {
    if (isUploadPopupHidden === true) {
      dispatchUploadPopup({ type: "show" });
    } else {
      dispatchUploadPopup({ type: "hide" });
    }
  }

  function showDAUploadPopup() {
    if (isDAUploadPopupHidden === true) {
      dispatchDAUploadPopup({ type: "show" });
    } else {
      dispatchDAUploadPopup({ type: "hide" });
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
          <label className="uploadButton" onClick={showUploadPopup}>
            Upload a file
          </label>
        )}
        <br/>
        {isUploadButtonHidden ? null : (
          <label className="uploadButton" onClick={showDAUploadPopup}>
            Upload Domoic Acid File
          </label>
        )}
      </div>
      {!isUploadPopupHidden && <UploadPopup toggle={showUploadPopup} />}
      {!isDAUploadPopupHidden && <UploadDomoicAcidPopup toggle={showDAUploadPopup} />}
      <DropdownRefinementList
        attribute={"properties.Common Name"}
        limit={50}
        transformItems={(items) => orderBy(items, "label", "asc")}
      />
      <DropdownRefinementList
        attribute={"properties.Year of Examination"}
        limit={50}
        // defaultRefinement={["2021"]}
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
      <DropdownRefinementList attribute={"properties.DA PRESENT IN AT LEAST ONE SAMPLE?"} />
      <Panel className="sliderContainer">
      <div className="sliderTitle">Domoic Acid Range Slider:</div>
      <CustomRangeSlider  attribute={"properties.Maximum Domoic Acid (ng per g)" } fullMin ={1} fullMax={238420}/>
      </Panel>
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
