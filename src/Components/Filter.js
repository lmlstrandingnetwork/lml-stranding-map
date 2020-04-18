import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Stats, RefinementList } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "UTKLMG7FHX",
  "8e4dd8f3e449a3add9ccefda057870f6"
);

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
