import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");

  const handleChange = (value) => {
    setValue(value);
    console.log("slider value = " + value);
    const selection = [props.items[value].label];
    console.log("filter selection = " + selection);
    props.refine(selection);
  };

  return (
    <div className={props.className}>
      {props.items.length > 0 ? (
        <div>
          <h4>{props.items[value].label}</h4>
          <label>{props.items[0].label}</label>
          <input
            type="range"
            min={0}
            max={props.items.length - 1}
            step={1}
            value={value}
            onChange={(changeEvent) => handleChange(changeEvent.target.value)}
          />
          <label>{props.items[props.items.length - 1].label}</label>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default connectRefinementList(TimeSlider);
