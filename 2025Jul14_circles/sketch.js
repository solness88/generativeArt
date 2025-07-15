// const circleDiameter = 80;
// let circleNumX, circleNumY; // 先に宣言のみ
// let circleColors = []; // 色を保存する2次元配列

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   angleMode(DEGREES);
//   background(0); // 最初だけ完全に黒.
//   circleNumX = width / circleDiameter;
//   circleNumY = height / circleDiameter;

//   for(let j = 0; j < circleNumY; j++){
//     circleColors[j] = [];

//     for(let i = 0; i < circleNumX; i++){
//       circleColors[j][i] = color(random(255), random(255), random(255));
//     };
//   }
// }

// function draw() {
//   background(0); // フレームごとに画面をクリア

//   for(let j = 0; j < circleNumY; j++){
//     for(let i = 0; i < circleNumX; i++){
//       let circleCenterX = circleDiameter*i + circleDiameter/2;
//       let circleCenterY = circleDiameter*j + circleDiameter/2;
//             // 上から下への波の計算
//             let wave = sin(circleCenterY * 0.02 + frameCount * 0.1);
      
//             // 波に基づいてサイズを変化（基本サイズ±変化幅）
//             let newSize = circleDiameter + wave * 30;
            
//             fill(255); // とりあえず白色で
//       // fill(circleColors[j][i])
//       ellipse(circleCenterX, circleCenterY, circleDiameter, circleDiameter) 
//     }
//   }
// }
const circleDiameter = 80;
let circleNumX, circleNumY;
let circleColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  circleNumX = Math.floor(width / circleDiameter);
  circleNumY = Math.floor(height / circleDiameter);
  
  // RGB モードのまま色の配列を初期化
  for(let j = 0; j < circleNumY; j++){
    circleColors[j] = [];
    for(let i = 0; i < circleNumX; i++){
      circleColors[j][i] = color(random(255), random(255), random(255));
    }
  }
}

function draw() {
  background(0);
  
  for(let j = 0; j < circleNumY; j++){
    for(let i = 0; i < circleNumX; i++){
      let circleCenterX = circleDiameter * i + circleDiameter / 2;
      let circleCenterY = circleDiameter * j + circleDiameter / 2;
      
      // 波の計算
      let wave = sin(circleCenterY * 0.01 + frameCount * 0.03);
      
      // 波の値を0〜1の範囲にマップ
      let sizeMultiplier = map(wave, -1, 1, 0.3, 1.0);
      let newSize = circleDiameter * sizeMultiplier;
            
      fill(circleColors[j][i]);
      ellipse(circleCenterX, circleCenterY, newSize, newSize);
    }
  }
}