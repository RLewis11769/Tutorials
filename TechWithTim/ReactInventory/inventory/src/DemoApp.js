import "./App.css";
import { PropTypes } from "prop-types";
import Info from "./DemoInfo";
import { useState } from "react";

function App() {
  // Main structure of app as seen in index.js
  return (
    <div className="App">
      <Info title="Inventory" />
      <AddItem text="shadow" />
      <AddItem />
      <ButtonState />
    </div>
  );
}

function AddItem(props) {
  // Functional component example

  // Pass as value in k:v pair to component
  // Can also deconstruct by AddItem({text}) and then omit props
  const value = props.text;

  return (
    <form>
      <label htmlFor="text-form">Add something</label>
      <input type="text" defaultValue={value} className="text-form" />
    </form>
  );
}

// Create object for default props for specific item
AddItem.defaultProps = {
  text: "default",
};

// Create object to define type checking (just warning, no enforcement)
AddItem.propTypes = {
  text: PropTypes.string,
};

function ButtonState() {
  // Function to handle state via buttons

  // Create variable and function, and default value of variable
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  // When function is called, rerender this component only
  const updateTitle = () => {
    setTitle("Updated");
  };

  const updateCounter = () => {
    setCount(count + 1);
  };

  return (
    // JSX is JavaScript syntax extension used for rendering - kind of JS and HTML combo
    <div>
      <Data title={title} count={count} />
      <button onClick={updateTitle}>Add Title</button>
      <button onClick={updateCounter}>Increment Counter</button>
    </div>
  );
}

function Data(props) {
  //
  return (
    <div>
      <p>Title: {props.title}</p>
      <p>Count: {props.count}</p>
    </div>
  );
}

export default App;
