import React from "react";

export default class LifeCycleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  // The following 3 methods are life cycle methods
  // This happens immediately after component mounted/rendered
  componentDidMount() {
    console.log("Component mounted");
  }

  // This happens every time component is rerendered (but not first time)
  componentDidUpdate() {
    console.log("Component updated");
    // Destroy prop passed in App.js
    if (this.state.count === 5) this.props.destroy(false);
  }

  // This happens right before component is removed from DOM
  // Used for cleanup (hover over name for examples)
  componentWillUnmount() {
    console.log("Cleanup!");
  }

  // Default button clicking method to show order
  clickedButton() {
    this.setState({ count: this.state.count + 1 });
    console.log("Clicked!");
  }

  render() {
    return (
      <div className="text-center my-5">
        <h1>Clicked {this.state.count} times</h1>
        <button className="btn btn-info" onClick={() => this.clickedButton()}>
          Click Me
        </button>
      </div>
    );
  }
}
