import React, {useState, useEffect} from "react";
import api from "../api";

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
          <h1>Stranding Story</h1>
          <p>{caseStudy["Field Number"]}</p>
          <p>{caseStudy["Case Study Writeup"]}</p>

          {caseStudy["Writeup Photo"] ? 
          <img
            className="caseimage"
            src={caseStudy["Writeup Photo"]}
          /> :
          <br></br>}

      </div>
  );
}

export default CaseStudyPage;