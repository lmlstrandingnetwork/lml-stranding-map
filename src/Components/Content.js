import React from "react";
import { Stats } from "react-instantsearch-dom";
import Map from "./Map";
import "./Content.css";

const Content = (props) => {
  const reducer = (isSidebarHidden, action) => {
    switch (action.type) {
      case "show":
        return false;
      case "hide":
        return true;
      default:
        return isSidebarHidden;
    }
  };

  const [isSidebarHidden, dispatch] = React.useReducer(reducer, false);

  const hideSidebar = () => {
    if (isSidebarHidden === false) {
      dispatch({ type: "hide" });
      console.log("show sidebar");
    } else {
      dispatch({ type: "show" });
      console.log("hide sidebar");
    }
  };

  return (
    <div className="content">
      <div className="info">
        <SidebarButton hideSidebar={hideSidebar} />
        <Stats
          translations={{
            stats(nbHits, timeSpentMS) {
              return `${nbHits} strandings found in ${timeSpentMS}ms`;
            },
          }}
        />
      </div>
      <Map hits={props.hits} heatmapState={props.heatmapState} />
    </div>
  );
};

const SidebarButton = (props) => {
  return (
    <button className="sidebar-btn" onClick={props.hideSidebar}>
      <span className="sidebar-btn-tooltip">Hide/show sidebar</span>
    </button>
  );
};

export default Content;
