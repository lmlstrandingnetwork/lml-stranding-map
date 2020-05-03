import React from "react";
import { Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import "./ClusteredMarkers.css";

const speciesMarkers = {
  Dolphin: "orange",
  Pinniped: "brown",
  Porpoise: "green",
  Seal: "blue",
  "Sea lion": "red",
  Whale: "purple",
};

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
            <svg
              height="24"
              version="1.1"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0 -1028.4)">
                <path
                  d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"
                  fill={
                    speciesMarkers[
                      report.properties["Common Name"].split(",")[0]
                    ]
                  }
                  transform="translate(0 1028.4)"
                />
              </g>
            </svg>
          </button>
        </Marker>
      ))}
    </Cluster>
  );
};

export default ClusteredMarkers;
