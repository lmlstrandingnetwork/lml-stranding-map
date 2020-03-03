import React, { useState } from "react";
import "../App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as strandings from "../strandings.json";


function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13
  });
  



  const [selectedStranding, setSelectedStranding] = useState(null);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle ="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"

        onViewportChange={viewport => {
          setViewport(viewport);
        }}
		
		
      >
		
        {strandings(strand => (
          <Marker
 //           key={strand.properties.PARK_ID}
            latitude={strand.Latitude}
            longitude={strand.Longitude}
          >
            <button
              class="marker-btn"
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
            latitude={selectedStranding.Latitude}
            longitude={selectedStranding.Longitude}
            onClose={() => {
              setSelectedStranding(null);
            }}
          >
            <div>

                <p> {selectedStranding.Sex} </p>

            
    
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
