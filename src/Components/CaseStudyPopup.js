import React from "react";
import { Popup } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./CaseStudyPopup.css";

const CaseStudyPopup = (props) => {  
  return (
    <Popup
      className="case-study"
      closeButton={false}
      closeOnClick={false}
      latitude={props.latitude}
      longitude={props.longitude}
      /* Offset longitude to display case study popup to the right of stranding popup */
      offset={[225, 0]}
      >
      <div className="case-study-header">
          <h3>Stranding Story</h3>
      </div>
      <div>
        {/* Check for "Photo" property, display if it exists" */}
        {props.selectedStranding.properties["Photo"] ?
          <img
          className="case-study-photo"
          src={props.selectedStranding.properties["Photo"]}
          alt={"Photo of stranded mammal " + props.selectedStranding.properties["Field Number"]}
          /> :
          /* If "Photo" property not present, use placeholder image */
          <img
          className="case-study-photo"
          src="https://firebasestorage.googleapis.com/v0/b/lml-stranding-map.appspot.com/o/4a5b602a3824f7e8253f1f4b0a94d324.jpg?alt=media&token=905c60f7-ddc1-4fac-894b-cd36bcad79fd"
          height="100px"
          alt="Placeholder, img of mammal unavailable"
          />
        }
      </div>
      {/* Display one sentence "Case Study Summary" */}
      <p className="case-study-summary">
        {props.selectedStranding.properties["Case Study Summary"]}
      </p>
      {/* Link to case study page using National Database Number */}
      <a
        href={'/stranding/' + props.selectedStranding.properties["National Database Number"]}
        target="_blank"             // opens link in new tab
        rel="noopener noreferrer"   // gets rid of eslint warning
        >
        <button className="case-study-button">
          Read More
        </button>
      </a>
      <br />
    </Popup>
  );
};

export default CaseStudyPopup;