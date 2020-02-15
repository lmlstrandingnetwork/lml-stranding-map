import React, {useState} from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as strandings from "./strandings.json";
//import * as strandingData from "./data/stranding-data.json";

//you dont need to type myinfo.js since it is default file for import

function App() {

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 700,
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 13
  });


const [selectedStranding, setSelectedStranding] = useState(null);


  return (
    
    /*
    must return a single JSX element, so wrap in a div
    */
    


    <div className="App">

      <ReactMapGL {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => {
        setViewport(viewport);
      }}  
      >

      {strandings.features.map((strand) => (
        <Marker key = {strand.properties.PARK_ID}
        latitude = {strand.geometry.coordinates[0]}
        longitude = {strand.geometry.coordinates[1]}>

        <button 
          class = "marker-btn" 
          onClick={(e) => {
            e.preventDefault();
            setSelectedStranding(strand); 
          }}
        >
                     
        <img src = "/seal-face-svgrepo-com.svg" />

        </button>


        </Marker>




        ) )}

      {selectedStranding ? (
        <Popup 
          latitude= {selectedStranding.geometry.coordinates[0]} 
          longitude=  {selectedStranding.geometry.coordinates[1]}

          onClose= {() => {
            setSelectedStranding(null)

        }}

        >
          <div>
            <h2> {selectedStranding.properties.NAME} </h2>
            <p> {selectedStranding.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
        ) : null}


      
      </ReactMapGL>

    </div>
  );
}

export default App;
