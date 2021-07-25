// Simple drawing program to demonstrate objects
// Makes circles/bubbles that randomly move

// Array that holds all bubble objects
const bubble = [];

// Note: Don't need "function" keyword for functions in class
// Note: Don't need "let" or "const" in class, just this.variablename
class Bubble {
  // Class that defines all attributes and methods of each Bubble object

  constructor(tempx, tempy, tempd = 20) {
    // Function that instantiates variables
    this.x = tempx;
    this.y = tempy;
    this.d = tempd;

    // Must be defined here to be used in class
  }

  show() {
    // Function that draws circle outlines
    const r = random(0, 255);
    const b = random(0, 255);
    stroke(r, 0, b);
    noFill();
    strokeWeight(4);
    circle(this.x, this.y, this.d);
  }

  move() {
    // Function that modifies circle position
    // When combined with infinite loop of display() looks like objects are moving
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  hoverOrClick(pixelx, pixely) {
    // Calculates whether or not mouse hovering over object or clicked on
    const d = dist(pixelx, pixely, this.x, this.y);
    // if statement true return true and if false return false
    return d < this.r / 2;
  }

  changeColor(g) {
    // Function that changes color of object
    stroke(this.r, g, 0);
  }
}

function setup() {
  // One-time function that creates objects

  createCanvas(600, 400);

  for (let i = 0; i < 10; i++) {
    // Random x and y position and size
    const x = random(width);
    const y = random(height);
    const r = random(10, 50);

    // Creating 10 objects
    bubble[i] = new Bubble(x, y, r);
  }
}

function draw() {
  // Infinite loop function to display objects as they move

  background(0);

  // Showing and animating object according to class methods
  for (const bub of bubble) {
    // As opposed to (let x = 0; x < bubble.length; x++) and use bubble[x]
    if (bub.hoverOrClick(mouseX, mouseY)) {
      // Color changing not working!!!
      // let g = random(255)
      // console.log(g)
      // console.log('Hi')
      // bub.changeColor(g);
    }

    bub.show();
    bub.move();
  }
}

function mousePressed() {
  // Two options for what to do on mouse click

  let count = 0;
  // Removes object when clicked on
  // Backwards because if delete index 3, index 4 is now orig index 5
  // Meaning orig 4 which is now at index 3 skipped
  // Sometimes deletes more than one at once and I have no idea why!!!
  for (let x = bubble.length - 1; x >= 0; x--) {
    if (bubble[x].hoverOrClick(mouseX, mouseY)) {
      bubble.splice(x, 1);
      count = +1;
    }
  }

  // Creates new bubble where click
  if (count === 0) {
    const r = random(10, 50);
    const b = new Bubble(mouseX, mouseY, r);
    bubble.push(b);
    count = 0;
  }
}
