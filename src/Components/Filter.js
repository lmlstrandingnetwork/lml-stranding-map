import React from "react";
import "../App.css";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Whale, gray" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log("Selected species: " + this.state.value);
    this.props.fetchItems({
      orderBy: "Common Name",
      equalTo: this.state.value,
    });
    event.preventDefault();
  }
  render() {
    return (
      <div className="filter">
        <form className="form" onSubmit={this.handleSubmit}>
          <label>
            Species:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="Whale, gray">Whale, gray</option>
              <option value="Sea lion, California">Seal, California</option>
              <option value="Porpoise, harbor">Porpoise, harbor</option>
            </select>
          </label>
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
