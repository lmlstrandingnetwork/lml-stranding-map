import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRange } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (value) => {
    const min = 1;
    const max = 2;
    setValue(value);
    props.refine({ min, max });
    console.log(value);
  };

  useEffect(() => {
    console.log(props.currentRefinement);
  });

  return (
    <div className={props.className}>
      <h4>{props.year}</h4>
      <label>{props.endTime}</label>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(changeEvent) => handleChange(changeEvent.target.value)}
      />
      <label>{props.startTime}</label>
    </div>
  );
};

export default connectRange(TimeSlider);
