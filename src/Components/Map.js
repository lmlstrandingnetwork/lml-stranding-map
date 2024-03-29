import React, { useState, useEffect, useRef } from "react";
import MapGL, { Source, Layer, NavigationControl } from "@urbica/react-map-gl";
import { orderBy } from "lodash";
import { withSize } from "react-sizeme";
import "mapbox-gl/dist/mapbox-gl.css";
import { heatmapLayer } from "./heatmapLayer";
import StrandingPopup from "./StrandingPopup";
import CaseStudyPopup from "./CaseStudyPopup";
import Legend from "./Legend";
import ClusteredMarkers from "./ClusteredMarkers";
import TimeSlider from "./TimeSlider";

const SizeAware = withSize({ noPlaceholder: true, monitorHeight: true })(
  (props) => props.children
);

function Map(props) {
  // Default map orientation
  const [view, setViewport] = useState({
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

  const mapRef = useRef();
  // Resize the map to the current webpage size
  const resizeMap = () => {
    mapRef.current && mapRef.current.getMap().resize();
  };
  // setup the marker colors
  const markerColors = {
    Dolphin: "orange",
    Pinniped: "gray",
    Porpoise: "green",
    Seal: "blue",
    "Sea lion": "red",
    Whale: "purple",
    Otariid: "brown",
    Cetacean: "lightgreen",
    "Stranding Story": "black"
  };

  useEffect(() => {
    strandings.features = props.hits;
    setStrandings(strandings);
    setStrandingsKey();
  }, [props.hits, strandings]);
  /* Creates a map that is aware to the current webpage size
   * Checks whether heatmap and time slider have been toggled on, which turn on their respective options
   * selectedStranding ? () checks if the user selected a stranding. If so, open the popup(s) with details, defined in StrandingPopup.js
   * <Legend> creates a legend object defined from Legend.js
   */
  return (
    <div>
      <SizeAware onSize={resizeMap}>
        <MapGL
          {...view}
          ref={mapRef}
          style={{
            width: "100%",
            height: "83vh",
          }}
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          {!props.isHeatmapHidden && (
            <Source
              id="reports"
              type="geojson"
              data={strandings}
              key={strandingsKey}
            >
              <Layer {...heatmapLayer} />
            </Source>
          )}
          {props.isHeatmapHidden && (
            <ClusteredMarkers
              strandings={strandings}
              setSelectedStranding={setSelectedStranding}
              markerColors={markerColors}
            />
          )}
          <TimeSlider
            className={props.isTimeSliderHidden ? "hidden" : "visible"}
            attribute="properties.Year of Examination"
            transformItems={(items) => orderBy(items, "label", "asc")}
            limit={1000}
          />
          {/* Normal stranding popup w/ info */}
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
          {/* Case Study ("Stranding Story") popup 
              Only shows if "Case Study" property is true
          */}
          {selectedStranding && selectedStranding.properties["Case Study"] ? (
            <CaseStudyPopup
              selectedStranding={selectedStranding}
              latitude={selectedStranding.geometry.coordinates[1]}
              longitude={selectedStranding.geometry.coordinates[0]}
              onClose={() => {
                setSelectedStranding(null);
              }}
            />
          ) : null}
          <Legend
            attribute={"properties.Common Name"}
            strandings={strandings}
            markerColors={markerColors}
          />
          <NavigationControl showCompass showZoom position="top-left" />
        </MapGL>
      </SizeAware>
    </div>
  );
}

export default Map;
