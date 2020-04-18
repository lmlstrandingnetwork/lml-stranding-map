import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Stats, RefinementList } from "react-instantsearch-dom";
import Map from "./Map";

const searchClient = algoliasearch(
  process.env.REACT_ALGOLIA_APP_ID,
  process.env.REACT_ALGOLIA_API_KEY
);

const index = searchClient.initIndex(process.env.REACT_ALGOLIA_INDEX_NAME);

const SideBar = () => (
  <div className="left-column">
    <h5> Common Name </h5>
    <RefinementList attribute="Common Name" />
    <h5> Year of Examination </h5>
    <RefinementList attribute="Year of Examination" />
    <h5> Sex </h5>
    <RefinementList attribute="Sex" />
  </div>
);

const Content = () => {
  return (
    <div className="right-column">
      <div className="info">
        <Stats />
      </div>
      <Map />
    </div>
  );
};

function Filter() {
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="reports">
        <main>
          <SideBar />
          <Content />
        </main>
      </InstantSearch>
    </div>
  );
}

export default Filter;
