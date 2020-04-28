import React, { Component } from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import PropTypes from "prop-types";

/**
 *
 * Dropdown menu item for DropdownRefinementList.
 *
 * Each component manages its own state and uses the RefinementList connector.
 *
 * Not typically interacted with directly by devs.
 *
 * Renders click event if hoverable=false or if on mobile
 *
 */
const cx = (label) => `ais-DropdownRefinementList-${label}`;

class DropdownRefinementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      mobile: false,
    };
  }

  componentDidMount() {
    this.setState({
      mobile: /Mobi/.test(navigator.userAgent),
    });
  }
  capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  renderItem = (item, i) => (
    <label key={i} className="ais-DropdownRefinementList-item-label">
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
    const { items, attribute, hoverable, currentRefinement } = this.props;
    const { active, mobile } = this.state;
    const title = attribute.split(".").pop();
    console.log(this.state);
    return (
      <div
        className="ais-DropdownRefinementList-container"
        onMouseLeave={hoverable && !mobile && this.handleEvent}
        onMouseEnter={hoverable && !mobile && this.handleEvent}
      >
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
            {items.map(this.renderItem)}
          </div>
        )}
      </div>
    );
  }
}

DropdownRefinementList.propTypes = {
  attribute: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
  limit: PropTypes.number,
};
DropdownRefinementList.defaultProps = {
  hoverable: false,
};

export default connectRefinementList(DropdownRefinementList);
