import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import api from "../api";
import Content from "./Content";
import Sidebar from "./Sidebar";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const reducer = (isComponentHidden, action) => {
  switch (action.type) {
    case "show":
      return false;
    case "hide":
      return true;
    default:
      return isComponentHidden;
  }
};

function Filter() {
  const [reportHits, setReportHits] = useState([]);
  const [isHeatmapHidden, dispatchHeatmap] = React.useReducer(reducer, true);
  const [isSidebarHidden, dispatchSidebar] = React.useReducer(reducer, false);
  const [isTimeSliderHidden, dispatchTimeSlider] = React.useReducer(
    reducer,
    true
  );

  function showHeatmap() {
    if (isHeatmapHidden === true) {
      dispatchHeatmap({ type: "show" });
    } else {
      dispatchHeatmap({ type: "hide" });
    }
  }

  function showTimeSlider() {
    if (isTimeSliderHidden === true) {
      dispatchTimeSlider({ type: "show" });
    } else {
      dispatchTimeSlider({ type: "hide" });
    }
  }

  const getResults = (searchState) => {
    let filters = ["properties.Year of Examination:2019"];
    if (searchState) {
      filters = Object.keys(searchState.refinementList)
        .filter((key) => searchState.refinementList[key].length !== 0)
        .map((key) =>
          searchState.refinementList[key].map((entry) => key + ":" + entry)
        );
    }

    let data = {
      facetFilters: filters,
      hitsPerPage: 1000,
      attributesToRetrieve: ["*"],
    };

    api
      .searchAlgolia(data)
      .then((response) => {
        setReportHits(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
        onSearchStateChange={(searchState) => getResults(searchState)}
      >
        <main>
          <Sidebar
            showHeatmap={showHeatmap}
            showTimeSlider={showTimeSlider}
            isSidebarHidden={isSidebarHidden}
          />
          <Content
            hits={reportHits}
            isHeatmapHidden={isHeatmapHidden}
            isSidebarHidden={isSidebarHidden}
            isTimeSliderHidden={isTimeSliderHidden}
            dispatchSidebar={dispatchSidebar}
          />
        </main>
      </InstantSearch>
    </div>
  );
}

export default Filter;
