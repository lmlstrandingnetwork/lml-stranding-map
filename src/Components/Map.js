import React, { useState, useEffect } from "react";
import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as strandings from "../strandings.json";

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
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(
      "https://gist.githubusercontent.com/paulyakovlev/171c30bbaa958e74920cc40138b9a129/raw/33bc1d7ba22bd74b21c8374c6583da5736b20169/smalldataset.json"
    );

    const items = await data.json();
    setItems(items.reports);
    console.log(items);
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
        {strandings.features.map(strand => (
          <Marker
            key={strand.properties.PARK_ID}
            latitude={strand.geometry.coordinates[0]}
            longitude={strand.geometry.coordinates[1]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedStranding(strand);
                //this.map.flyTo({ center: [-118.4107187, 33.9415889] })
                //compiles but doesn't do anything?
              }}
            >
              <img src="/seal-face-svgrepo-com.svg" alt="seal-face" />
            </button>
          </Marker>
        ))}

        {selectedStranding ? (
          <Popup
            latitude={selectedStranding.geometry.coordinates[0]}
            longitude={selectedStranding.geometry.coordinates[1]}
            onClose={() => {
              setSelectedStranding(null);
            }}
          >
            <div>
              <h2> {selectedStranding.properties.SPECIES} </h2>

              <p> {selectedStranding.properties.MODIFIED_D} </p>
              <p> {selectedStranding.properties.DESCRIPTION} </p>
              <p> {selectedStranding.properties.AGE} </p>
              <p> {selectedStranding.properties.SEX} </p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
