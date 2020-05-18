import React, { useEffect, useState } from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";
import { connectRefinementList } from "react-instantsearch-dom";

const Legend = (props) => {
  const [legendItems, setLegendItems] = useState([]);

  useEffect(() => {
    const groupSpecies = (items) => {
      // count how many species in each group
      var counts = items.reduce((p, c) => {
        var name = c.label.split(",")[0];
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name] += c.count;
        return p;
      }, {});

      // construct array of objects for legend items
      var countsExtended = Object.keys(counts).map((k) => {
        return { name: k, count: counts[k], color: props.markerColors[k] };
      });

      setLegendItems(countsExtended);
    };

    groupSpecies(props.items);
  }, [props.items, props.markerColors]);

  const renderLegendItem = (item, i) => (
    <li key={i}>
      <MarkerSVG markerColor={[item.color]} />
      <label classname="item-name">{item.name}</label>
      <label classname="item-count">({item.count})</label>
    </li>
  );

  return (
    <div className="legend">
      <ul>{legendItems.map(renderLegendItem)}</ul>
    </div>
  );
};

export default connectRefinementList(Legend);
