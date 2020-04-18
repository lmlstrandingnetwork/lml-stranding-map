import React, { useState, useEffect, Component } from "react";
import "../App.css";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import Filter from './Filter';
import Testdata from "../test-data.json";
import { heatmapLayer } from '../heatmap-style'; 
//import { json as requestJson } from 'd3-request';



function Heatmap() {
  // Effect hook on mount and unmount
//   useEffect(() => {
//     fetchItems();
//   }, []);
console.log("smth");

  // Set state hooks
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 800,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13
  });

  // This holds the information for the popups
  const [selectedStranding, setSelectedStranding] = useState(null);

  // This holds our strandings for now, default state is empty array
  const [strandings, setStrandings] = useState([]);

  //Consume JSON data from placeholder and load into array

 const fetchItems = async () => {
   
  console.log("in fetch items");
  
     const data = await fetch(
       "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"

     );
   
  
    const strandings = await data.json();
   //const test_data = Testdata;
  // console.log("testdata type: " + test_data );
   
   console.log(strandings);
  
  /* 
   {Testdata.map( (element) => {
    return <h1> {element.features.geometry.type}</h1>
  } 

)
}
    */
  
   var bool = Array.isArray(strandings);
   if(bool)
       {
           console.log("good to go");
       }
    setStrandings(strandings);
    console.log(strandings);
  };
    
  useEffect(() => {
    fetchItems();
  },[]);

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
        
        {strandings && (
          <Source type="geojson" data={Testdata}>
            <Layer {...heatmapLayer} />
          </Source>
        )}


        <Filter />
      </ReactMapGL>
    </div>
    
  );
}

export default Heatmap;