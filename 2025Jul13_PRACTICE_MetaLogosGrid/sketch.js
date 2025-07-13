let angleX = 0;
let angleY = 0;
let angleX2 = 180;
let angleY2 = 180;
const radius = 30;
let pathPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0); // 最初だけ完全に黒
  
  // 色をランダムに決定
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));

  // 白い線の軌跡
  for(let i = 0;i < 360;i=i+0.5){
    let x = radius * cos(i);
    let y = radius * sin(i*2);
    pathPoints.push([x,y])
  }
}

function draw() {
  fill(0, 10); // 透明度30の黒
  // 透明な黒で少しずつ消す
  noStroke();
  rect(0, 0, width, height);
  translate(width/2, height/2);

  fill(69, 68, 68)
  for(i = 0; i < 720; i++){
    ellipse(pathPoints[i][0], pathPoints[i][1], 1, 1)
  };
  
  let circleX = radius * cos(angleX);
  let circleY = radius * sin(angleY);
  let circleX2 = radius * cos(angleX2);
  let circleY2 = radius * sin(angleY2);
  
  fill(color1);
  ellipse(circleX, circleY, 10, 10);

  fill(color2)
  ellipse(circleX2, circleY2, 10, 10);
  
  angleX += 1;
  angleY += 2;
  angleX2 += 1;
  angleY2 += 2;
}