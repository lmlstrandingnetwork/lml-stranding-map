import React from "react";
import { Stats } from "react-instantsearch-dom";
import Map from "./Map";
import "./Content.css";

const Content = (props) => {
  return (
    <div className="content">
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
      <Map hits={props.hits} heatmapState={props.heatmapState} />
    </div>
  );
};

const SidebarButton = (props) => {
  return <button className="sidebar-btn" onClick={props.collapseSidebar} />;
};

export default Content;
