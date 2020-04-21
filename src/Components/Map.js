import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "../App.css";

function Map(props) {
  // Default map orientation
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13,
  });

  // This holds the information for the popups
  const [selectedStranding, setSelectedStranding] = useState(null);

  // This holds our strandings for now, default state is empty array
  const [strandings, setStrandings] = useState([]);

  // Update strandings after every render
  useEffect(() => {
    setStrandings(props.hits);
  });

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
        {strandings.map((report) => (
          <Marker
            key={report["National Database Number"]}
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
              <img src="/seal-grey-svgrepo-com.svg" alt="seal-face" />
            </button>
          </Marker>
        ))}
        {selectedStranding ? (
          <Popup
            latitude={selectedStranding.geometry.coordinates[1]}
            longitude={selectedStranding.geometry.coordinates[0]}
            onClose={() => {
              setSelectedStranding(null);
            }}
          >
            <div>
              <h2> {selectedStranding.properties["Common Name"]} </h2>
              <p> {selectedStranding.properties["Date of Examination"]} </p>
              <p> {selectedStranding.properties["Age Class"]} </p>
              <p> {selectedStranding.properties["Sex"]} </p>
              <p>Latitude: {selectedStranding.geometry.coordinates[1]}</p>
              <p>Longitude: {selectedStranding.geometry.coordinates[0]}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
