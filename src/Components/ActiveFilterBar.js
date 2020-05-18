import React from "react";
import "./ActiveFilterBar.css";

const ActiveFilterBar = (props) => {
    console.log(props.reportFilters)
    return (
        <div>
        <li style={{ listStyle: "none" }}>Active Filters: </li>
        <ul className="bubblelist">
          {(props.reportFilters).map((filters) => (
            <div>
                  {filters.map((filterbubble) => (
                    <div className="filterbubble">
                        {filterbubble}
                    </div>
                ))}
            </div>
            ))}
         </ul>
        </div>
    );
};

export default ActiveFilterBar;
