let angleX = 0;
let angleY = 0;
const radius = 100;
let trail = [];
let mode = 'drawing'; // 'drawing' または 'erasing'
let eraseIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  
  // カメラの回転
  rotateX(30);
  rotateY(frameCount * 0.3);
  
  if (mode === 'drawing') {
    let circleX = radius * cos(angleX);
    let circleY = radius * sin(angleY);
    let circleZ = 50 * sin(angleX * 2);
    
    // 軌跡に現在位置を追加
    trail.push({x: circleX, y: circleY, z: circleZ});
    
    angleX += 0.5;
    angleY += 1;
    
    // 1周したら即座に消去モードに切り替え
    if (angleX >= 360) {
      mode = 'erasing';
      eraseIndex = 0;
      // angleXとangleYの更新を停止（ここで描画完了）
    }
  } else if (mode === 'erasing') { // else if に変更
    // 先頭から削除
    eraseIndex += 1;
    
    // 全部消えたらリセット
    if (eraseIndex >= trail.length) {
      trail = [];
      angleX = 0;
      angleY = 0;
      mode = 'drawing';
      eraseIndex = 0;
    }
  }
  
  // 軌跡を描画
  if (trail.length > 0) {
    stroke(0, 255, 0);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = eraseIndex; i < trail.length; i++) {
      vertex(trail[i].x, trail[i].y, trail[i].z);
    }
    endShape();
  }
}