import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [value, setValue] = useState(1);

  const handleChange = (value) => {
    setValue(value);

    console.log(value);
  };

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

export default connectRefinementList(TimeSlider);
