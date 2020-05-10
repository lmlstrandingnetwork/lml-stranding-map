import React from "react";
import "./TimeSlider.css";

const TimeSlider = (props) => {
  return (
    <div className="time-slider">
      <input type="range" min={1} max={1} step={1} />
    </div>
  );
};

export default TimeSlider;
