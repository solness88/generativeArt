function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0);
}

let radius = 300;
let angle = 0;

function draw() {
  translate(width/2, height/2);

  let positionX = cos(angle) * radius
  let positionY = sin(angle) * radius

  fill(255);
  ellipse(positionX,positionY,50,50);

  angle += 20;
}
