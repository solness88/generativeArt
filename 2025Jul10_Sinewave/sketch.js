let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // 軌跡効果のため少し透明な黒で重ね描き
  fill(0, 0, 0, 15);
  rect(0, 0, width, height);
  
  time += 1;
  
  drawAudioWaves();
}

function drawAudioWaves() {
  let centerY = height / 2;
  let numWaves = 12; // 波の数を増加
  
  // 複数の波を重ねて描画
  for (let wave = 0; wave < numWaves; wave++) {
    noFill();
    strokeWeight(1); // より細い線
    
    // 各波に異なる色相と周波数
    let hue = (time * 2 + wave * 30) % 360; // 間隔を短く
    let frequency = 0.02; // 全て同じ周波数
    let amplitude = 120 - wave * 30; // より大きな振幅
    let phase = wave * 25; // タイミングをずらす位相差
    
    stroke(hue, 80, 90, 60);
    
    beginShape();
    for (let x = 0; x <= width; x += 1) { // より滑らかに
      // 統一された波形（全て同じパターン、位相差のみ）
      let y1 = amplitude * sin(time * 0.5 + x * frequency + phase); // 速度を1/3に
      let y2 = (amplitude * 0.5) * sin(time * 1 + x * frequency * 2 + phase); // 速度を1/3に
      let y3 = (amplitude * 0.3) * sin(time * 1.5 + x * frequency * 3 + phase); // 速度を1/3に
      
      let y = centerY + y1 + y2 + y3;
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}