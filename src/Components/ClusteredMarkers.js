import React from "react";
import { Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import "./ClusteredMarkers.css";

const ClusterMarker = ({ longitude, latitude, pointCount }) => {
  var clusterSize = pointCount * 1.75;
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <div
        style={{
          height: clusterSize,
          width: clusterSize,
          maxHeight: 80,
          maxWidth: 80,
          minHeight: 20,
          minWidth: 20,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          background: "#2284e6",
          borderRadius: "75px",
          border: "1px solid #333",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {pointCount}
      </div>
    </Marker>
  );
};

const ClusteredMarkers = (props) => {
  return (
    <Cluster
      radius={40}
      extent={512}
      nodeSize={64}
      component={ClusterMarker}
      maxZoom={14}
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
            {report.properties["Common Name"] === "Sea lion, California" ? (
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
