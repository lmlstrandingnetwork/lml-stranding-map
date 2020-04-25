import React, { useState, useEffect } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { heatmapLayer } from "../heatmap-style";
import "../App.css";

function Heatmap(props) {
  // Viewport state
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13,
  });

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
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {strandings && (
          <Source type="geojson" data={strandings} key={strandingsKey}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Heatmap;