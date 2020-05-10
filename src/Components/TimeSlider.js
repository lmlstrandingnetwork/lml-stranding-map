import React from "react";
import "./TimeSlider.css";

const TimeSlider = (props) => {
  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((props.endTime - props.startTime) / day);

  return (
    <div className="time-slider">
      <h4>{props.year}</h4>
      <label>{props.endTime}</label>
      <input type="range" min={1} max={days} step={1} />
      <label>{props.startTime}</label>
    </div>
  );
};

export default TimeSlider;
