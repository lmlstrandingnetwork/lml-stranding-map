import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [value, setValue] = useState(0);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  // update our current year label and refine by it when slider is moved
  const handleChange = (value) => {
    setValue(value);
    setCurrentYear(props.items[value].label);
    props.refine([props.items[value].label]);
  };

  // move the slider on its own on an interval when play button pressed
  const handleClick = () => {
    for (var i = 0; i <= props.items.length - 1; i++) {
      var tick = function (i) {
        return function () {
          document.querySelector("input[type=range]").value = i;
          handleChange(i);
        };
      };
      setTimeout(tick(i), 500 * i);
    }
  };

  // update the range of the slider every time the list of filterable years changes
  useEffect(() => {
    const handleFilterChange = () => {
      setStartYear(props.items[0].label);
      setEndYear(props.items[props.items.length - 1].label);
    };
    handleFilterChange();
  }, [props.items]);

  return (
    <div className={props.className}>
      {props.items.length > 0 ? (
        <div>
          <h4>{currentYear}</h4>
          <button className="play-button" onClick={handleClick} />
          <label>{startYear}</label>
          <input
            type="range"
            min={0}
            max={props.items.length - 1}
            step={1}
            value={value}
            onChange={(changeEvent) => handleChange(changeEvent.target.value)}
          />
          <label>{endYear}</label>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default connectRefinementList(TimeSlider);
