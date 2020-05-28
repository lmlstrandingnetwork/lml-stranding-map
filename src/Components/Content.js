import React from "react";
import { Stats } from "react-instantsearch-dom";
import Map from "./Map";
import "./Content.css";
import Logout from "./Logout.js"

const Content = (props) => {
  const hideSidebar = () => {
    if (props.isSidebarHidden === false) {
      props.dispatchSidebar({ type: "hide" });
    } else {
      props.dispatchSidebar({ type: "show" });
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
              return `${
                Object.keys(props.hits).length > 0 ? nbHits : 0
              } strandings found`;
            },
          }}
        />

        <Logout/>
      </div>
      <Map
        hits={props.hits}
        isHeatmapHidden={props.isHeatmapHidden}
        isTimeSliderHidden={props.isTimeSliderHidden}
      />
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
