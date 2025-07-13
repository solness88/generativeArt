let angleX = 0;
let angleY = 0;
const radius = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0); // 最初だけ完全に黒
}

function draw() {
  // 透明な黒で少しずつ消す
  fill(0, 10); // 透明度30の黒
  noStroke();
  rect(0, 0, width, height);
  
  translate(width/2, height/2);
  

  
  let circleX = radius * cos(angleX);
  let circleY = radius * sin(angleY);
  
  fill(0, 255, 0);
  ellipse(circleX, circleY, 50, 50);
  
  angleX += 0.5;
  angleY += 1;
}