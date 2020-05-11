import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [value, setValue] = useState(1);

  const handleChange = (value) => {
    setValue(value);
    console.log("slider value = " + value);
    const selection = [props.items[value].label];
    console.log("filter selection = " + value);
    props.refine(selection);
  };

  return (
    <div className={props.className}>
      <h4>{props.year}</h4>
      <label>{props.endTime}</label>
      <input
        type="range"
        min={0}
        max={props.items.length - 1}
        step={1}
        value={value}
        onChange={(changeEvent) => handleChange(changeEvent.target.value)}
      />
      <label>{props.startTime}</label>
    </div>
  );
};

export default connectRefinementList(TimeSlider);
