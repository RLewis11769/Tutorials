import React from "react";


export default class Info extends React.Component {
  // Class component example - slightly diff syntax

  // If using props in class, must use super() for constructor
  constructor(props) {
    super(props);
    // Pay attention to when this prints
    console.log(props);

    // Define default state in object
    this.state = {
      count: 0
    };

    // Option 2 for how to bind function to class component
    // this.buttonPushed = this.buttonPushed.bind(this);
  }

  // Need to bind function to class component so can use "this" keyword
  // Can add arrow function in onClick as seen below or bind as seen in constructor (commented out)
  buttonPushed() {
    // Function to update state (state is local, temporary)
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    // Render method used similar to functional component

    // Use "this" when not in constructor
    const title = this.props.title;
    // Showing how to use ternary and pass variables
    const showTitle = true;

    return (
      // Need wrapper if multiple children elements
      <div>
        <h1>{showTitle ? title : ""}</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.buttonPushed()}>Increment me!</button>
      </div>
    );
  }
}
