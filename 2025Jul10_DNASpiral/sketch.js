let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0); // 純粋な黒
  translate(width / 2, 0);
  time += 1;
  
  drawDNASpiral();
}

function drawDNASpiral() {
  let squareSize = min(width, height) * 0.6;
  let helixHeight = squareSize;
  let steps = 150;
  let spiralWidth = squareSize * 0.2;
  
  // 3つの螺旋を描画（派手な効果付き）
  for (let i = 0; i < steps; i++) {
    let y = map(i, 0, steps - 1, -helixHeight/2, helixHeight/2);
    
    // 基本の螺旋波
    let wave1 = sin(time + i * 4);
    let wave2 = sin(time + i * 4 + 120);
    let wave3 = sin(time + i * 4 + 240);
    
    // 脈動効果（時間による拡大縮小）
    let pulse = 0.8 + 0.4 * sin(time * 2);
    
    // 位置計算（脈動効果適用）
    let x1 = wave1 * spiralWidth * pulse;
    let x2 = wave2 * spiralWidth * pulse;
    let x3 = wave3 * spiralWidth * pulse;
    
    // 動的サイズ（波の強度 + 脈動 + ランダム要素）
    let baseSize = 15 + 10 * sin(time * 0.5 + i * 2);
    let size1 = baseSize * (0.5 + 0.5 * abs(wave1)) * pulse;
    let size2 = baseSize * (0.5 + 0.5 * abs(wave2)) * pulse;
    let size3 = baseSize * (0.5 + 0.5 * abs(wave3)) * pulse;
    
    // 複雑な色相計算（多重波）
    let hue1 = (time * 3 + i * 12 + sin(time * 0.3) * 60) % 360;
    let hue2 = (time * 3 + i * 12 + 120 + cos(time * 0.4) * 60) % 360;
    let hue3 = (time * 3 + i * 12 + 240 + sin(time * 0.5) * 60) % 360;
    
    // 動的な明度と彩度（呼吸するような効果）
    let brightness = 60 + 40 * sin(time * 1.5 + i * 3);
    let saturation = 70 + 30 * cos(time * 1.2 + i * 2);
    
    // グロー効果用の透明度
    let alpha = 60 + 40 * abs(sin(time * 0.8 + i * 1.5));
    
    // メイン点を描画
    fill(hue1, saturation, brightness, alpha);
    noStroke();
    circle(x1, y, size1);
    
    fill(hue2, saturation, brightness, alpha);
    circle(x2, y, size2);
    
    fill(hue3, saturation, brightness, alpha);
    circle(x3, y, size3);
    
    // グロー効果（大きな半透明の円）
    fill(hue1, saturation * 0.6, brightness * 0.8, alpha * 0.3);
    circle(x1, y, size1 * 2.5);
    
    fill(hue2, saturation * 0.6, brightness * 0.8, alpha * 0.3);
    circle(x2, y, size2 * 2.5);
    
    fill(hue3, saturation * 0.6, brightness * 0.8, alpha * 0.3);
    circle(x3, y, size3 * 2.5);
    
    // 火花効果（ランダムな小さな点）
    if (random(100) < 15) { // 15%の確率で火花
      let sparkX = x1 + random(-20, 20);
      let sparkY = y + random(-20, 20);
      fill(hue1, 100, 100, 80);
      circle(sparkX, sparkY, random(2, 6));
      
      sparkX = x2 + random(-20, 20);
      sparkY = y + random(-20, 20);
      fill(hue2, 100, 100, 80);
      circle(sparkX, sparkY, random(2, 6));
      
      sparkX = x3 + random(-20, 20);
      sparkY = y + random(-20, 20);
      fill(hue3, 100, 100, 80);
      circle(sparkX, sparkY, random(2, 6));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}