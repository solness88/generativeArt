let radius = 0;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0);
}

function draw() {
  translate(width/2, height/2)

  let circleX = radius * cos(angle);
  let circleY = radius * sin(angle);
  angle += 20 + sin(radius * 0.05) * 10; // 角度の増加量を変化

  fill(random(255),random(255),random(255))
  ellipse(circleX, circleY, 5,5)
  angle += 0.01;
  radius += 0.5;
}