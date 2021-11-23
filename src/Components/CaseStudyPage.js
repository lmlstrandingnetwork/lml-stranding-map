import React from "react";

const CaseStudyPage = (props) => {
    const [caseStudy, setCaseStudy] = useState([]);
    // send the parsed records to Firebase through the backend
    const getCaseStudy = (e) => {
        e.preventDefault();
        featureCollection.forEach((element) =>
          api
            .uploadData({ record: element, userToken: userToken }, config)
            .then((response) => {
              setResponseData(response);
            })
            .catch((error) => {
              console.log(error);
            })
        );
    };
    return (
        <div>
            <h1>Case Study</h1>
        </div>
    );
}

export default CaseStudyPage;