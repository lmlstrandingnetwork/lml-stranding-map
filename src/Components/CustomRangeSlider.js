import React from 'react';
import "./CustomRangeSlider.css";
import { connectRange } from 'react-instantsearch-dom';
// source: https://www.algolia.com/doc/api-reference/widgets/range-slider/react/

// Prerequisite: install rheostat@4
import 'rheostat/initialize';
import Rheostat from 'rheostat';
import 'rheostat/css/rheostat.css';
import log10 from 'rheostat/lib/algorithms/log10';
console.log(log10);

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine,fullMin,fullMax }) => {
  const [stateMin, setStateMin] = React.useState(fullMin);
  const [stateMax, setStateMax] = React.useState(fullMax);
  const [filteringDisabled, setfilteringDisabled] = React.useState(min === undefined || max === undefined);
  React.useEffect(() => {
    if (canRefine) {
      
      if(currentRefinement.max === undefined || currentRefinement.min === undefined)
      {
        setfilteringDisabled(true);
      }
      else{
        setfilteringDisabled(false);
        setStateMin(currentRefinement.min);
        setStateMax(currentRefinement.max);
      }
    }
  }, [currentRefinement.min, currentRefinement.max]);

  

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };
  const onCheckboxClicked = (event) => {
    setfilteringDisabled(event.target.checked);
    if(event.target.checked)
    {
      
      refine({ min:undefined, max:undefined });
    } else{
      refine({min: stateMin, max: stateMax});
    }
    
  };
  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
    //setfilteringDisabled(currentRefinement.max === undefined || currentRefinement.min === undefined );
  };

  return (
    <>
    <Rheostat
      className = "sliderSpacing"
      disabled={filteringDisabled}
      min={fullMin}
      max={fullMax}
      algorithm={log10}
      values={[stateMin, stateMax]}
      onChange={onChange}
      onValuesUpdated={onValuesUpdated}
      
    >
      <div
        className="rheostat-marker rheostat-marker--large"
        style={{ left: 0 }}
      >
        <div className="rheostat-value rangeStyle">{stateMin} ng/g - {stateMax} ng/g</div>
      </div>
      
    </Rheostat>
    <input type="checkbox" id="disable-filter" checked={filteringDisabled?"checked":""} onChange={onCheckboxClicked}></input>
    <label className="checkboxStyle" for="disable-filter">Disable Slider</label>
    </>
  );
};


export default connectRange(RangeSlider);