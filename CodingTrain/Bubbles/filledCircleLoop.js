// Simple drawing program to demonstrate basics of p5.js
// Makes a pretty circle that starts off lines and is eventually filled in

// Global variable starts at 0 and changes within function
let angle = 0;

// Prebuilt setup function happens once
function setup() {
  createCanvas(400, 400);
  background(255, 0, 200);
}

// Prebuilt draw function happens in a loop
function draw() {

  // x and y calculate position of end point of line that appears to rotate
  // Map is special p5.js function, not traditional JS map method
    // Maps one set of data to new values (calculates conversion)
    // First argument is incoming value to be calculated
      // cos(angle) or sin(angle) of perfect circle the size of canvas
    // -1, 1 is current range of value
    // 0, width is target range of value (width and height are same)
  const x = map(cos(angle), -1, 1, 0, width);
  const y = map(sin(angle), -1, 1, 0, height);

  // Applies to color of all lines from this point until stroke declared again
  // Meaning line and circle outline are both yellow
  stroke(255, 200, 0);

  // Line start point is center (200, 200) as set by createCanvas
  // Line end point is position (x, y) as calculated above
  line(200, 200, x, y);

  // 20px diameter circle that rotates with line at position of (x, y))
  circle(x, y, 20);

  // Increases on each rotation of infinite loop
  angle += 0.02;
}
