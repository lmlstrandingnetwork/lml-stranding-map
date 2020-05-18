import React, { useEffect, useState } from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";
import { connectRefinementList } from "react-instantsearch-dom";

const Legend = (props) => {
  const [legendItems, setLegendItems] = useState([]);

  useEffect(() => {
    const groupSpecies = (items) => {
      var counts = items.reduce((p, c) => {
        var name = c.label.split(",")[0];
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name] += c.count;
        return p;
      }, {});

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
