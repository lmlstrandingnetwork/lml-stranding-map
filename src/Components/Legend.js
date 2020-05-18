import React, { useEffect, useState } from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";
import { connectRefinementList } from "react-instantsearch-dom";

const Legend = (props) => {
  const [legendItems, setLegendItems] = useState([]);

  const groupSpecies = (items) => {
    var counts = items.reduce((p, c) => {
      var name = c.label.split(",")[0];
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name] += c.count;
      return p;
    }, {});

    console.log(counts);

    var countsExtended = Object.keys(counts).map((k) => {
      return { name: k, count: counts[k] };
    });

    console.log(countsExtended);

    setLegendItems(countsExtended);
  };

  useEffect(() => {
    groupSpecies(props.items);
  }, [props.items]);

  const renderLegendItem = (item, i) => (
    <li key={i}>
      <MarkerSVG markerColor={props.speciesMarkers[item.name]} />
      <span>{item.label}</span>
      {console.log(item.name)}
      <span>{item.name}</span>
      <span>{item.count}</span>
    </li>
  );

  return (
    <div className="legend">
      <ul>{legendItems.map(renderLegendItem)}</ul>
    </div>
  );
};

export default connectRefinementList(Legend);
