import React from "react";
import { Stats } from "react-instantsearch-dom";
import Map from "./Map";
import ActiveFilterBar from "./ActiveFilterBar";
import "./Content.css";

const Content = (props) => {
  return (
    <div className="content">
      <div className="activefilterbar">
          <ActiveFilterBar
            /*passed from Filter to Content */
            reportFilters={props.reportFilters}
          />
        </div>
      <div className="info">
        <SidebarButton />
        <Stats
          translations={{
            stats(nbHits, timeSpentMS) {
              return `${nbHits} strandings found in ${timeSpentMS}ms`;
            },
          }}
        />
      </div>
      <Map hits={props.hits} 
      heatmapState={props.heatmapState} />
    </div>
  );
};

const SidebarButton = (props) => {
  return (
    <button className="sidebar-btn" onClick={props.collapseSidebar}>
      <span className="sidebar-btn-tooltip">Hide/show sidebar</span>
    </button>
  );
};

export default Content;
