function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

let radius = 300;
let currentAngle = 0;

function draw() {
  background(0); // 毎フレームクリア
  translate(width/2, height/2);

  // 18個の点を全て描画
  for (let i = 0; i < 18; i++) {
    let pointAngle = i * 20; // 0, 20, 40...340度
    
    // 現在角度との差を計算
    let angleDiff = abs(currentAngle - pointAngle);
    if (angleDiff > 180) {
      angleDiff = 360 - angleDiff;
    }
    
    // 角度差を輝度に変換（近いほど明るい）
    let brightness = map(angleDiff, 0, 180, 255, 50);
    
    let positionX = cos(pointAngle) * radius;
    let positionY = sin(pointAngle) * radius;
    
    fill(brightness);
    ellipse(positionX, positionY, 50, 50);
  }
  
  currentAngle += 2; // 影の回転速度
  if (currentAngle >= 360) {
    currentAngle = 0;
  }
}