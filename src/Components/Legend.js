import React, { useEffect, useState } from "react";
import "./Legend.css";
import MarkerSVG from "./MarkerSVG";
import { connectRefinementList } from "react-instantsearch-dom";

const Legend = (props) => {
   const [legendItems, setLegendItems] = useState([]);
   
   useEffect(() => {
      const groupSpecies = (items) => {
         // count how many species in each group
         let temp_features = props.strandings.features;
         // create/setup all of the counts
         var counts = {};
         var cs_count = 0;
         // for each case, increment it's species in the counts dict
         // if it's a case study, increment cs_count
         for (var i = 0; i < temp_features.length; i++)
         {
            var name = temp_features[i].properties["Common Name"].split(",")[0];
            // check if we already saw this name (sea lion vs seal vs whale vs etc.), then increment the counter
            if (!counts.hasOwnProperty(name)) {
               counts[name] = 0;
            }
            counts[name] += 1;
            // check if the current stranding case is a case study
            if (temp_features[i].properties["Case Study"] === "TRUE")
               cs_count++;
         }
         if (cs_count > 0)
            counts["Case Study"] = cs_count;
         /*
         var counts = items.reduce((p, c) => {
            var name = c.label.split(",")[0];
            if (!p.hasOwnProperty(name)) {
               p[name] = 0;
            }
            p[name] += c.count;
            return p;
         }, {});
         /**/
         // construct array of objects for legend items
         var countsExtended = Object.keys(counts).map((k) => {
            return { name: k, count: counts[k], color: props.markerColors[k] };
         });
      
         setLegendItems(countsExtended);
      };
   
      groupSpecies(props.items);
   }, [props.items, props.markerColors, props.strandings.features]);
   // Create the Legend object as html and returns it
   const renderLegendItem = (item, i) => (
      <li key={i}>
      <MarkerSVG markerColor={[item.color]} />
      <label className="item-name">{item.name}</label>
      <span className="item-count">({item.count})</span>
      </li>
   );
   return (
      <div className="legend">
         <ul>{legendItems.map(renderLegendItem)}</ul>
      </div>
   );
};

export default connectRefinementList(Legend);
