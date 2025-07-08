// Global variables
let time = 0;

function setup() {
  // Create fullscreen canvas
  createCanvas(windowWidth, windowHeight);

  // Set color mode to HSB for easier color manipulation
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  // Black background
  background(0);

  // Move origin to center of screen
  translate(width / 2, height / 2);

  // Very slow time increment for peaceful animation
  time += 0.005;

  // 80-fold symmetry kaleidoscope (like pages of a book)
  for (let symmetry = 0; symmetry < 160; symmetry++) {
    push();

    // Rotate each "page" by 4.5 degrees (360÷80=4.5)
    rotate(symmetry * 4.5);

    // Each ball has slightly different speed for organic movement
    let speedMultiplier = 1 + symmetry * 0.02;

    // Spiral motion with breathing effect
    let radius = (50 + sin(time * 0.3 * speedMultiplier) * 40) * 5;
    let x = cos(time * 2 * speedMultiplier) * radius;
    let y = sin(time * 2 * speedMultiplier) * radius;

    // Color changes smoothly across the spectrum
    let hue = (time * 2 + symmetry * 4.5) % 360;

    // Draw the ball
    fill(hue, 80, 90);
    noStroke();
    circle(x, y, 15);

    pop();
  }
}

// Handle window resize for responsive design
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
