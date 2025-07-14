const circleDiameter = 80;
let circleNumX, circleNumY; // 先に宣言のみ
let circleColors = []; // 色を保存する2次元配列

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0); // 最初だけ完全に黒.
  circleNumX = width / circleDiameter;
  circleNumY = height / circleDiameter;

  for(let j = 0; j < circleNumY; j++){
    circleColors[j] = [];

    for(let i = 0; i < circleNumX; i++){
      circleColors[j][i] = color(random(255), random(255), random(255));
    };
  }
}

function draw() {


  for(let j = 0; j < circleNumY; j++){
    for(let i = 0; i < circleNumX; i++){
      let circleCenterX = circleDiameter*i + circleDiameter/2;
      let circleCenterY = circleDiameter*j + circleDiameter/2;
      fill(circleColors[j][i])
      ellipse(circleCenterX, circleCenterY, circleDiameter, circleDiameter) 
    }
  }
}
