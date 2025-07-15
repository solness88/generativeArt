let startPointY;
let lineLength = 1000; // 線の長さ
let endPointY = startPointY + lineLength;
let speed = 1;
let pointX = -600;
let lineColors = [];
let linePositions = [];  // 各線の位置を別々に管理
let lineSpeed = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0); // 最初だけ完全に黒.

  for(let i = 0; i < 200; i++){
    startPointY = sin(i * 10) * 50 - 1500;  // ← sin関数で波を作る
    endPointY = startPointY + lineLength;   // ← endPointYも再計算が必要
    lineColors[i] = color(random(255),random(255),random(255))
    linePositions[i] = {pointX: pointX + i*10, startPointY: startPointY, endPointY: endPointY};
    lineSpeed[i] = 5;
  }
}

function draw() {
  translate(width/2, 0)
  background(0, 10); // 軌跡を残すため少し透明な黒
  strokeWeight(3)

  for(let j = 0; j < 120; j++){
    stroke(lineColors[j])

    linePositions[j].startPointY += lineSpeed[j];
    linePositions[j].endPointY += lineSpeed[j];

    // 画面下に達したら速度を反転
    if(linePositions[j].startPointY > height + 200) {
      lineSpeed[j] = -5;  // 上向きに変更
    }
    // 画面上に達したら速度を反転
    if(linePositions[j].startPointY < -1200) {
      lineSpeed[j] = 5;   // 下向きに変更
    }

  // ここを変更！
  let dynamicLength = lineLength + sin(frameCount + j*5) * 100;
  let endY = linePositions[j].startPointY + dynamicLength;
  
  line(linePositions[j].pointX, linePositions[j].startPointY, linePositions[j].pointX, endY)

  }
}