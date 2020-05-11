import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [value, setValue] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleChange = (value) => {
    setValue(value);
    console.log("slider value = " + value);
    const selection = [props.items[value].label];
    console.log("filter selection = " + value);
    props.refine(selection);
  };

  useState(() => {
    setStart(props.items[0].label);
    setEnd(props.items[props.items.length - 1].label);
  }, []);

  return (
    <div className={props.className}>
      <h4>{props.items[value].label}</h4>
      <label>{start}</label>
      <input
        type="range"
        min={0}
        max={props.items.length - 1}
        step={1}
        value={value}
        onChange={(changeEvent) => handleChange(changeEvent.target.value)}
      />
      <label>{end}</label>
    </div>
  );
};

export default connectRefinementList(TimeSlider);
