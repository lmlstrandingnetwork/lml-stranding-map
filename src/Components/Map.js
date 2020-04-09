import React, { useState, useEffect } from "react";
import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Filter from "./Filter";

function Map() {
  // Effect hook on mount and unmount
  useEffect(() => {
    fetchItems();
  }, []);

  // Set state hooks
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

  // Consume JSON data from placeholder and load into array
  const fetchItems = async (params) => {
    let url = "https://sos-data-viz.firebaseio.com/reports.json";

    if (params) {
      url +=
        "?" +
        Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&");
    }

    console.log(url);
    const data = await fetch(url);

    const strandings = await data.json();
    setStrandings(strandings);
    console.log(strandings);
  };

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
            latitude={Number(report.Latitude)}
            longitude={Number(report.Longitude)}
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
            latitude={Number(selectedStranding.Latitude)}
            longitude={Number(selectedStranding.Longitude)}
            onClose={() => {
              setSelectedStranding(null);
            }}
          >
            <div>
              <h2> {selectedStranding["Common Name"]} </h2>
              <p> {selectedStranding["Date of Examination"]} </p>
              <p> {selectedStranding["Age Class"]} </p>
              <p> {selectedStranding["Sex"]} </p>
              <p>Latitude: {selectedStranding.Latitude}</p>
              <p>Longitude: {selectedStranding.Longitude}</p>
            </div>
          </Popup>
        ) : null}
        <Filter />
      </ReactMapGL>
    </div>
  );
}

export default Map;
