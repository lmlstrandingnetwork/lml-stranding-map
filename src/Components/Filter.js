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
  // toggles the heat map
  function showHeatmap() {
    if (isHeatmapHidden === true) {
      dispatchHeatmap({ type: "show" });
    } else {
      dispatchHeatmap({ type: "hide" });
    }
  }
  // toggles the time slider
  function showTimeSlider() {
    if (isTimeSliderHidden === true) {
      dispatchTimeSlider({ type: "show" });
    } else {
      dispatchTimeSlider({ type: "hide" });
    }
  }
  // Gets the list of all common names for the selected year(s) of examination
  const getResults = (searchState) => {
    // let filters = ["properties.Year of Examination:2021"];
    let filters = ["properties.Year of Examination"];
    let rangeFilter = "";
    
    if (searchState) {
      if (Object.hasOwn(searchState, 'refinementList')) {
        filters = Object.keys(searchState.refinementList)
          .filter((key) => searchState.refinementList[key].length !== 0)
          .map((key) =>
            searchState.refinementList[key].map((entry) => key + ":" + entry)
        );
      }
      if(Object.hasOwn(searchState, 'range')){
        if(Object.hasOwn(searchState.range,'properties.Maximum Domoic Acid (ng per g)')){
          const min = searchState.range['properties.Maximum Domoic Acid (ng per g)'].min;
          const max = searchState.range['properties.Maximum Domoic Acid (ng per g)'].max;
          if(min !== undefined && max !==undefined)
          {
            rangeFilter = `"properties.Maximum Domoic Acid (ng per g)":${min} TO ${max}`;
          }
          

        }
         
      }
    }
    

    let data = {
      filters: rangeFilter,
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
  // Creates and returns the html for the Filter object
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
