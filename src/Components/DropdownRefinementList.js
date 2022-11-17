import React, { Component } from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import "./DropdownRefinementList.css";

const cx = (label) => `ais-DropdownRefinementList-${label}`;

class DropdownRefinementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  renderItem = (item, i) => (
    <label key={i} className="ais-DropdownRefinementList-item-label">
      {(item.label == "Y") ? console.log("bruh") : console.log("bruuuuuh")}
      <input
        type="checkbox"
        checked={item.isRefined}
        onChange={() => {
          this.selectItem(item);
        }}
      />
      <span>{item.label}</span>
      <span className={cx("item-count")}> ({item.count})</span>
    </label>
  );
  selectItem = (item, resetQuery) => {
    this.props.refine(item.value);
  };
  handleEvent = (e) => {
    this.setState({ active: !this.state.active });
  };
  render() {
    const { items, attribute, currentRefinement } = this.props;
    const { active } = this.state;
    var title = attribute.split(".").pop();
    
    if(title === "DA PRESENT IN AT LEAST ONE SAMPLE?"){
      title = "Domoic Acid";
    }

    return (
      <div className="ais-DropdownRefinementList-container">
        <div className={cx("title-container")} onClick={this.handleEvent}>
          <span className="ais-DropdownRefinementList-title">
            {title}{" "}
            {currentRefinement.length > 0 ? (
              <p className={cx("active-facets")}>{currentRefinement.length}</p>
            ) : (
              <i className={cx("caret-down")} />
            )}
          </span>
        </div>
        {active && (
          <div className="ais-DropdownRefinementList-List">
            {console.log(items)}
            {items.map(this.renderItem)}
          </div>
        )}
      </div>
    );
  }
}

DropdownRefinementList.propTypes = {
  attribute: PropTypes.string.isRequired,
  limit: PropTypes.number,
};

export default connectRefinementList(DropdownRefinementList);
