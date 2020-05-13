import React from "react";
import "./ActiveFilterBar.css";

const ActiveFilterBar = (props) => {
    console.log(props.reportFilters)
    return (
        <div>
        <li>Filtering By: </li>
          {(props.reportFilters).map((filters) => (
              <li style={{ listStyle: "none" }}>
                <div classname= "filterbubble">
                    {filters}
                </div>
              </li>
            ))}
        </div>
    );
};

export default ActiveFilterBar;
