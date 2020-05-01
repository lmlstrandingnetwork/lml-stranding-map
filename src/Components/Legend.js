import * as React from 'react';
import {PureComponent} from 'react';
import './Legend.css';

export default class Legend extends PureComponent {
  render() {
    return (
      <div className="legend">
            <li>
                <img src="./seal-grey-svgrepo-com.svg" alt="seal icon"></img>
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