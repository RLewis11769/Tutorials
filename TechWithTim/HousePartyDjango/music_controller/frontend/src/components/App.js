import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage"

export default function App(props) {
  // The tutorial uses class components but I changed to functional components
  return (
    <div className="center">
      <HomePage />
    </div>
  );
}

const appDiv = document.getElementById("app");
// Render App component inside appDiv (which is #app inside index.html)
render(<App name="Shadow" />, appDiv);
