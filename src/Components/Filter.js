import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import Content from "./Content";
import Sidebar from "./Sidebar";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const index = searchClient.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

const initialHeatmapState = {
  visible: false,
};

const reducer = (heatmapState, action) => {
  switch (action.type) {
    case "show":
      return { visible: true };

    case "hide":
      return { visible: false };

    default:
      return heatmapState;
  }
};

const reducerSidebar = (isSidebarHidden, action) => {
  switch (action.type) {
    case "show":
      return false;
    case "hide":
      return true;
    default:
      return isSidebarHidden;
  }
};

function Filter() {
  const [toggleState, setToggleState] = useState("off");
  const [reportHits, setReportHits] = useState([]);
  const [heatmapState, dispatch] = React.useReducer(
    reducer,
    initialHeatmapState
  );
  const [isSidebarHidden, dispatchSidebar] = React.useReducer(
    reducerSidebar,
    false
  );

  function showHeatmap() {
    if (heatmapState.visible === false) {
      setToggleState("on");
      dispatch({ type: "show" });
    } else {
      setToggleState("off");
      dispatch({ type: "hide" });
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

    if (filters.length === 0) {
      setReportHits([]);
    } else {
      index
        .search("", {
          facetFilters: filters,
          hitsPerPage: 1000,
          attributesToRetrieve: ["*"],
        })
        .then(({ hits }) => {
          setReportHits(hits);
        });
    }
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
            heatmapState={heatmapState}
            showHeatmap={showHeatmap}
            toggleState={toggleState}
            setToggleState={setToggleState}
            isSidebarHidden={isSidebarHidden}
          />
          <Content
            hits={reportHits}
            heatmapState={heatmapState}
            isSidebarHidden={isSidebarHidden}
            dispatchSidebar={dispatchSidebar}
          />
        </main>
      </InstantSearch>
    </div>
  );
}

export default Filter;
