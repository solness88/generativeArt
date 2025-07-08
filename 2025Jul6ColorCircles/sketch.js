// Global variables
let time = 0;
let noiseScale = 0.01; // ノイズのスケール

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(220, 20, 15);
  translate(width / 2, height / 2);
  time += 0.55;
  drawGeometricGrid();
}

function drawGeometricGrid() {
  let maxSize = min(width, height) * 0.8;
  let gridSize = 12;
  let cellSize = maxSize / gridSize;

  for (let x = -gridSize / 2; x < gridSize / 2; x++) {
    for (let y = -gridSize / 2; y < gridSize / 2; y++) {
      let posX = x * cellSize;
      let posY = y * cellSize;

      let distance = sqrt(x * x + y * y);

      // 方法1: ペルリンノイズを使用した自然な不規則性
      let noiseValue = noise(
        (x + gridSize / 2) * noiseScale,
        (y + gridSize / 2) * noiseScale,
        time * 0.01
      );
      let noiseOffset = noiseValue * 100;

      // 方法2: 複数の異なる周期の組み合わせ
      let slowWave = sin(time * 0.3 + distance * 5);
      let mediumWave = sin(time * 0.8 + x * 25 + y * 15);
      let fastWave = sin(time * 1.5 + (x * x + y * y) * 3);

      // 方法3: フィボナッチ数列ベースの周期
      let fibIndex = (abs(x) + abs(y)) % 8;
      let fibNumbers = [1, 1, 2, 3, 5, 8, 13, 21];
      let fibScale = fibNumbers[fibIndex] * 0.1;
      let fibWave = sin(time * fibScale + distance * 10);

      // 方法4: 素数ベースの不規則性
      let primes = [2, 3, 5, 7, 11, 13, 17, 19];
      let primeIndex = abs(x * 2 + y * 3) % primes.length;
      let primeWave = cos(time * 0.1 * primes[primeIndex] + distance * 8);

      // すべての波を組み合わせ
      let combinedWave =
        (slowWave +
          mediumWave * 0.7 +
          fastWave * 0.5 +
          fibWave * 0.8 +
          primeWave * 0.6 +
          (noiseValue - 0.5) * 4) /
        4.0;

      // スケールの計算（より劇的な変化）
      let scaleAmount = 0.1 + 0.9 * (0.5 + 0.5 * combinedWave);

      // 時々完全に消える効果
      if (abs(combinedWave) < 0.1) {
        scaleAmount *= 0.1; // ほぼ消える
      }

      // 回転も不規則に
      let rotation =
        time * (0.5 + noiseValue) +
        distance * 15 +
        x * 20 +
        y * 25 +
        combinedWave * 45;

      // 色も複雑に変化
      let hue =
        (time * 0.8 +
          distance * 40 +
          combinedWave * 60 +
          x * 12 +
          y * 18 +
          noiseOffset) %
        360;

      let saturation = 100; // 最大彩度
      let brightness = 100; // 最大明度
      let alpha = 60 + 30 * abs(combinedWave);

      stroke(hue, saturation, brightness, alpha);

      // 線の太さも変化
      let weight = (1 + abs(combinedWave)) * 2 * (min(width, height) / 800);
      strokeWeight(weight);
      noFill();

      push();
      translate(posX, posY);
      rotate(rotation);
      scale(scaleAmount);

      // 常に円を描画
      circle(0, 0, cellSize / 2);

      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
