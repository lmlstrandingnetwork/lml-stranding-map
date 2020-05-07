import React from "react";
import "./ActiveFilterBar.css";

//map over repertFilters
const ActiveFilterBar = (props) => {
    console.log(props.reportFilters)
    return (
        <div>
            <li>Filtering By: </li>
            {props.reportFilters}
        </div>
    );
};

export default ActiveFilterBar;
