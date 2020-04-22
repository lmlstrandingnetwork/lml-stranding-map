import React, { useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import Filter from "./Filter";
import { heatmapLayer } from "../heatmap-style";
import "../App.css";

function Heatmap() {
  // Set state hooks
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13,
  });

  // This holds our strandings for now, default state is empty array
  const [strandings, setStrandings] = useState([]);

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
          <Source type="geojson" data={strandings}>
            <Layer {...heatmapLayer} />
          </Source>
        )}

        <Filter />
      </ReactMapGL>
    </div>
  );
}

export default Heatmap;
