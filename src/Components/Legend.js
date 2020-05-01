import * as React from 'react';
import {PureComponent} from 'react';
import LegendStyles from './LegendStyles.css';

export default class Legend extends PureComponent {
  render() {
    return (
      <div className="legend">
        <h3>Legend:</h3>
            <li>
                <img src="./seal-grey-svgrepo-com.svg"></img>
                Sea lion, California
            </li>
            <li>
                <img src="./red-pin.svg" alt="red pin"></img>
                All other species
            </li>
        
      </div>
    );
  }
}