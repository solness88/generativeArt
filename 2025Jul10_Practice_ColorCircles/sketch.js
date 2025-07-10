// 基本変数
let time = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(50);
  translate(width / 2, height / 2);
  time += 5; // 時間を進める
  
  drawSimpleGrid();
}

function drawSimpleGrid() {
  let gridSize = 3; // 3x3のグリッド（9個の円）
  let cellSize = 80; // セルのサイズ
  
  for (let x = -1; x <= 1; x++) {     // -1, 0, 1
    for (let y = -1; y <= 1; y++) {   // -1, 0, 1
      
      let posX = x * cellSize;
      let posY = y * cellSize;
      
      // 基本的な波の計算
      let wave = sin(time + x*30 + y*30);
      
      // スケール（大きさの変化）
      // -1から1までの数値を0から1の数値に変換する
      let scaleAmount = 0.5 + 0.5 * wave; // 0から1の間で変化
      
      // 色（赤から青へ変化）
      let redValue = 128 + 127 * wave;
      
      // 描画
      stroke(redValue, 0, 255 - redValue);
      strokeWeight(2);
      noFill();
      
      push();
      translate(posX, posY);
      scale(scaleAmount);
      
      circle(0, 0, 40);
      
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



// -1から1までの数値を0から1の数値に変換する
// これは覚えてしまえば後々使う機会は多いと思われる
// let scaleAmount = 0.5 + 0.5 * wave;

// 色（赤から青へ変化）
// let redValue = 128 + 127 * wave;
// 描画
// stroke(redValue, 0, 255 - redValue);