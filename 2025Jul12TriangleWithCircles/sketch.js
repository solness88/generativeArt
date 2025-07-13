let progress = 0;
let triangleColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  let radius = 60;
  let spacing = radius * 2.5;
  
  // 各三角形の色を事前に決定
  for (let row = 0; row < height / spacing + 1; row++) {
    triangleColors[row] = [];
    for (let col = 0; col < width / spacing + 1; col++) {
      triangleColors[row][col] = {
        color1: color(random(255), random(255), random(255)),
        color2: color(random(255), random(255), random(255)),
        color3: color(random(255), random(255), random(255))
      };
    }
  }
}

function draw() {
  background(0);
  
  progress += 0.01;
  if (progress >= 1) progress = 0;
  
  let radius = 60;
  let spacing = radius * 2.5;
  
  for (let row = 0; row < height / spacing + 1; row++) {
    for (let col = 0; col < width / spacing + 1; col++) {
      push();
      translate(col * spacing + spacing/2, row * spacing + spacing/2);
      
      let centerX = 0;
      let centerY = 0;
      
      let x1 = centerX + cos(-90) * radius;
      let y1 = centerY + sin(-90) * radius;
      let x2 = centerX + cos(-90 + 120) * radius;
      let y2 = centerY + sin(-90 + 120) * radius;
      let x3 = centerX + cos(-90 + 240) * radius;
      let y3 = centerY + sin(-90 + 240) * radius;
      
      // 固定の白い正三角形を描画
      noFill();
      stroke(255);
      strokeWeight(1);
      triangle(x1, y1, x2, y2, x3, y3);
      
      let moveLine1X = lerp(x1, x2, progress);
      let moveLine1Y = lerp(y1, y2, progress);
      let moveLine2X = lerp(x2, x3, progress);
      let moveLine2Y = lerp(y2, y3, progress);
      let moveLine3X = lerp(x3, x1, progress);
      let moveLine3Y = lerp(y3, y1, progress);
      
      // 3つの点を描画
      noStroke();
      fill(triangleColors[row][col].color1);
      ellipse(moveLine1X, moveLine1Y, 15, 15);
      fill(triangleColors[row][col].color2);
      ellipse(moveLine2X, moveLine2Y, 15, 15);
      fill(triangleColors[row][col].color3);
      ellipse(moveLine3X, moveLine3Y, 15, 15);
      
      pop();
    }
  }
}