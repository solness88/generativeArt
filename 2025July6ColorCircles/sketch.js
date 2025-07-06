// Global variables
let time = 0;

function setup() {
  // Create fullscreen canvas
  createCanvas(windowWidth, windowHeight);

  // Set angle mode to degrees
  angleMode(DEGREES);

  // Set color mode to HSB (Hue, Saturation, Brightness)
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // Very dark background to prevent blackout gaps
  background(220, 20, 15);

  // Move origin to center
  translate(width / 2, height / 2);

  // Moderate speed - not too fast, not too slow
  time += 0.55;

  // Draw geometric grid patterns
  drawGeometricGrid();
}

function drawGeometricGrid() {
  // Grid-based geometric patterns
  let maxSize = min(width, height) * 0.8;
  let gridSize = 12;
  let cellSize = maxSize / gridSize;

  // Create grid of geometric shapes
  for (let x = -gridSize / 2; x < gridSize / 2; x++) {
    for (let y = -gridSize / 2; y < gridSize / 2; y++) {
      let posX = x * cellSize;
      let posY = y * cellSize;

      // Distance from center for scaling effect
      let distance = sqrt(x * x + y * y);
      let maxDistance = sqrt(
        (gridSize / 2) * (gridSize / 2) + (gridSize / 2) * (gridSize / 2)
      );
      let distanceRatio = distance / maxDistance;

      // Time-based animation with moderate speed
      let timeOffset = distance * 0.5;
      let scaleAmount = 0.3 + 0.7 * abs(sin(time * 0.55 + timeOffset)); // Moderate speed
      let rotation = time * 0.7 + distance * 15; // Moderate rotation speed

      // Slightly muted colors with moderate cycling
      let hue = (time * 1.1 + distance * 60) % 360; // Moderate color cycling
      let saturation = 75 + sin(time * 0.55 + distance * 2) * 10; // Reduced saturation (75-85)
      let brightness = 80 + sin(time * 0.45 + distance * 2.5) * 10; // Reduced brightness (70-90)
      let alpha = 75 + 15 * abs(sin(time * 0.6 + distance * 1.5)); // Moderate alpha changes

      stroke(hue, saturation, brightness, alpha);
      strokeWeight(2 * (min(width, height) / 800)); // Reduced from 3 to 2 (2/3 of original)
      noFill();

      push();
      translate(posX, posY);
      rotate(rotation);
      scale(scaleAmount, scaleAmount);

      // Alternate between different geometric shapes - all circles now
      let shapeType = (abs(x) + abs(y)) % 1; // Only one type: circle

      switch (shapeType) {
        case 0:
        default:
          // Circle
          circle(0, 0, cellSize / 2);
          break;
      }

      pop();
    }
  }

  // Remove connection lines and geometric center
  // drawConnectionLines();
  // drawGeometricCenter();
}

// Removed unused shape functions
// function drawTriangle(size) { ... }
// function drawDiamond(size) { ... }
// function drawHexagon(size) { ... }
// function drawConnectionLines() { ... }
// function drawGeometricCenter() { ... }
// function drawStar(radius, points) { ... }

// Handle window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
