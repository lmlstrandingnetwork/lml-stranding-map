import React, { useState, useEffect } from "react";
import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

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
    zoom: 13
  });

  const [selectedStranding, setSelectedStranding] = useState(null);

  // This holds our strandings for now, default state is empty array
  const [strandings, setStrandings] = useState([]);

  // Consume JSON data from placeholder and load into array
  const fetchItems = async () => {
    const data = await fetch(
      "https://gist.githubusercontent.com/paulyakovlev/171c30bbaa958e74920cc40138b9a129/raw/80bffce9266808d1972dbce384ff9cdf6cf1b51b/smalldataset.json"
    );

    const strandings = await data.json();
    setStrandings(strandings.reports);
    console.log(strandings.reports);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {strandings.map(report => (
          <Marker
            key={report["National Database Number"]}
            latitude={Number(report.Latitude)}
            longitude={Number(report.Longitude)}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedStranding(report);
              }}
            >
              <img src="/seal-face-svgrepo-com.svg" alt="seal-face" />
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
