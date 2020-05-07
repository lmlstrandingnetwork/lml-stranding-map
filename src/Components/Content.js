import React from "react";
import { Stats } from "react-instantsearch-dom";
import Map from "./Map";
import "./Content.css";

const Content = (props) => {
  const hideSidebar = () => {
    if (props.isSidebarHidden === false) {
      props.dispatchSidebar({ type: "hide" });
      console.log("hide sidebar");
    } else {
      props.dispatchSidebar({ type: "show" });
      console.log("show sidebar");
    }
  };

  return (
    <div className={"content" + (props.isSidebarHidden ? "_big" : "")}>
      <div className="info">
        <SidebarButton
          hideSidebar={hideSidebar}
          isSidebarHidden={props.isSidebarHidden}
        />
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
    <button className={"sidebar-btn"} onClick={props.hideSidebar}>
      <span className="sidebar-btn-tooltip">Hide/show sidebar</span>
    </button>
  );
};

export default Content;
