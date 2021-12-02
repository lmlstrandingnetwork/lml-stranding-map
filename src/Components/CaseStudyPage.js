import React, {useState, useEffect} from "react";
import api from "../api";
import "./CaseStudyPage.css";

const CaseStudyPage = (props) => {
  // databaseid (National Database Number) passed in via URL of case study page
  const databaseid = props.databaseid;
  const [caseStudy, setCaseStudy] = useState({});
  
  // retrieve data for given databaseid from Firebase
  useEffect(() => {
    api
      .getStranding(databaseid)
      .then((response) => {
        console.log(response.data);
        setCaseStudy(response.data.properties);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [databaseid]); // only call useEffect when the databaseid prop updates
  
  return (
    <div>
      <div className="header">
        <h1>Stranding Story</h1>
        <h6>{caseStudy["Field Number"]}</h6>
      </div>
      <div className="caseStudy">
          <div className="photo">
            {caseStudy["Writeup Photo"] ?
            <img
              className="caseimage"
              src={caseStudy["Writeup Photo"]}
              alt={"Photo of stranded mammal " + caseStudy["Field Number"]}
            /> :
            <img
              className="caseimage"
              src={caseStudy["Photo"]}
              alt={"Photo of stranded mammal " + caseStudy["Field Number"]}
            />}
          </div>

          <div className="writeup">
            <p className="writeupText">{caseStudy["Case Study Writeup"]}</p>
          </div>

      </div>
    </div>
  );
}

export default CaseStudyPage;