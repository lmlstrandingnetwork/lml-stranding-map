import React, {useState} from 'react';
import './App.css';
import ReactMapGL, {Marker} from "react-map-gl";
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



  return (
    
    /*
    must return a single JSX element, so wrap in a div
    */
    

    <div className="App">

      <ReactMapGL {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
      onViewportChange={viewport => {
        setViewport(viewport);
      }}  
      >

      <Marker
        latitude={36.974117}
        longitude= {-122.030792}
      >
      

  	</Marker>
      
      </ReactMapGL>

    </div>
  );
}

export default App;
