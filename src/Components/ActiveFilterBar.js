import React from "react";
import "./ActiveFilterBar.css";

const ActiveFilterBar = (props) => {
    console.log(props.reportFilters)
    return (
        <div>
        <li>Filtering By: </li>
        <ul className="bubblelist">
          {(props.reportFilters).map((filters) => (
            <div>
                  {filters.map((filterbubble) => (
                    <div className="filterbubble">
                        <li > {filterbubble} </li>
                    </div>
                ))}
            </div>
            ))}
         </ul>
        </div>
    );
};

export default ActiveFilterBar;
