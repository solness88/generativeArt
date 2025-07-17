function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0); // 背景を黒に
  
  // カメラを固定（全体は回転させない）
  camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
  
  // ハートを敷き詰める
  drawHeartGrid();
}
function drawHeartGrid() {
  let heartSize = 0.8; // ハートのサイズを2倍に
  let gap = 70; // ハート同士の間隔を少し詰める
  
  // 画面いっぱいまで数を増やす
  let cols = 14; // 横に14個
  let rows = 11; // 縦に11個
  
  // 中央寄せのための開始位置
  let startX = -(cols - 1) * gap / 2;
  let startY = -(rows - 1) * gap / 2;
  
  for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
          push();
          
          // 各ハートの位置（固定）
          let posX = startX + x * gap;
          let posY = startY + y * gap;
          translate(posX, posY, 0);
          
          // 各ハートが個別に回転
          // 位置によって回転速度を少し変える
          let rotationSpeed = 1 + (x + y) * 0.01;
          rotateX(frameCount * random(0.01,0.05) * rotationSpeed);
          rotateY(frameCount * random(0.01,0.02) * rotationSpeed);
          
          // サイズを調整
          scale(heartSize);
          
          // 各ハートにランダムな色を設定
          drawOneHeart(x, y);
          
          pop();
      }
  }
}

function drawOneHeart(x, y) {
  // 位置に基づいてランダムな色を生成（毎回同じ色になるように）
  randomSeed(x * 100 + y);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  
  fill(r, g, b);
  noStroke();
  
  // ハートを前後に3枚重ねる

      
      // 1枚のハートを描く
      beginShape();
      for (let i = 0; i <= 50; i++) {
          let t = map(i, 0, 50, 0, TWO_PI);
          
          // ハートの形
          let x = 16 * pow(sin(t), 3) * 2;
          let y = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) * 2;
          
          vertex(x, y);
      }
      endShape(CLOSE);

}

function windowResized() {
  resizeCanvas(600, 400);
}