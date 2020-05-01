
import React, { useState, useEffect } from "react";
import MapGL, { Marker, Source, Layer } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import "./ClusteredMarkers.css"

const style = {
  width: "20px",
  height: "20px",
  color: "#fff",
  background: "#1978c8",
  borderRadius: "20px",
  textAlign: "center",
};

const ClusterMarker = ({ longitude, latitude, pointCount }) => (
  <Marker longitude={longitude} latitude={latitude}>
    <div style={{ ...style, background: "#f28a25" }}>{pointCount}</div>
  </Marker>
);

const ClusteredMarkers = (props) => {
  return (
    <Cluster
      radius={40}
      extent={512}
      nodeSize={64}
      component={ClusterMarker}
    >
      {props.strandings.features.map((report) => (
        <Marker
          key={report["objectID"]}
          latitude={report.geometry.coordinates[1]}
          longitude={report.geometry.coordinates[0]}
        >
          <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedStranding(report);
            }}
          >
            {/* decide which icon to give the animal */}
            {report.properties["Common Name"] ===
              "Sea lion, California" ? (
                <img src="/seal-grey-svgrepo-com.svg" alt="seal-face" />
              ) : (
                <img src="/red-pin.svg" alt="seal species" />
              )}
          </button>
        </Marker>
      ))}
    </Cluster>

  );
};

export default ClusteredMarkers;


