import React from "react";
import { Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import "./ClusteredMarkers.css";
import MarkerSVG from "./MarkerSVG";

const ClusterMarker = ({ longitude, latitude, pointCount }) => {
  var clusterSize = pointCount * 1.85;
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <div
        className="cluster-marker"
        style={{
          height: clusterSize,
          width: clusterSize,
          maxHeight: 70,
          maxWidth: 70,
          minHeight: 30,
          minWidth: 30,
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
            <MarkerSVG
              markerColor={
                props.speciesMarkers[
                  report.properties["Common Name"].split(",")[0]
                ]
              }
            />
          </button>
        </Marker>
      ))}
    </Cluster>
  );
};

export default ClusteredMarkers;
