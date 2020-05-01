import React, { useState, useEffect } from "react";
import MapGL, { Marker, Source, Layer } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { heatmapLayer } from "./heatmapLayer";
import StrandingPopup from "./StrandingPopup";
import Legend from "./Legend";

function Map(props) {
  // Default map orientation
  const [viewport, setViewport] = useState({
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13,
  });

  // This holds the information for the popups
  const [selectedStranding, setSelectedStranding] = useState(null);

  // Strandings state in geojson format
  const [strandings, setStrandings] = useState({
    type: "FeatureCollection",
    features: [],
  });

  // Use a key and useReducer to force React to unmount and mount <Source/> when strandings update
  const [strandingsKey, setStrandingsKey] = React.useReducer((c) => c + 1, 0);

  useEffect(() => {
    strandings.features = props.hits;
    setStrandings(strandings);
    console.log(strandings);
    setStrandingsKey();
  }, [props.hits, strandings]);

  return (
    <div>
      <MapGL
        {...viewport}
        style={{ width: "100%", height: "670px" }}
        accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {props.heatmapState.visible && (
          <Source
            id="reports"
            type="geojson"
            data={strandings}
            key={strandingsKey}
          >
            <Layer {...heatmapLayer} />
          </Source>
        )}
        {!props.heatmapState.visible &&
          strandings.features.map((report) => (
            <Marker
              key={report["objectID"]}
              latitude={report.geometry.coordinates[1]}
              longitude={report.geometry.coordinates[0]}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedStranding(report);
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
        {selectedStranding ? (
          <StrandingPopup
            selectedStranding={selectedStranding}
            latitude={selectedStranding.geometry.coordinates[1]}
            longitude={selectedStranding.geometry.coordinates[0]}
            onClose={() => {
              setSelectedStranding(null);
            }}
          />
        ) : null}
        <Legend />
      </MapGL>
    </div>
  );
}

export default Map;
