import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

var clicks = 0;
var time;
var seconds = 0;

const TimeSlider = (props) => {
  const [value, setValue] = useState(0);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  // update our current year label and refine by it when slider is moved
  const handleChange = (value) => {
    seconds = value;
    setValue(value);
    setCurrentYear(props.items[value].label);
    props.refine([props.items[value].label]);
    
  };

  // move the slider on its own on an interval when play button pressed
  // allow slider to be paused at a given value
  const handleClick = () => {
    clicks++;
    if(clicks % 2){
      // if at end of slider values, next play starts from earliest year
      if(seconds >= props.items.length - 1){
        seconds = 0;
      }
      start();
    }
    else{
      stop();
    }


    function start() {
       time = setTimeout(function() {
        ++seconds;
        start();
      }, 500);
      document.querySelector('.play-button').style.cssText = "border-style: double; padding-bottom: 12px; border-width: 0px 0px 0px 24px;";
      // if at end of slider values, stop auto slide
      if (seconds >= props.items.length - 1){
        stop();
        clicks++;
        document.querySelector('.play-button').style.cssText = "border-style: solid; padding-bottom: 0px; border-width: 12px 0px 12px 24px;";
      }
      handleChange(seconds);
    }
    function stop() {
      document.querySelector('.play-button').style.cssText = "border-style: solid; padding-bottom: 0px; border-width: 12px 0px 12px 24px;";
      clearTimeout(time);
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
  // create the html for the Time Slider, with a range going from first year of exam to last year of exam
  // has a play button
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
