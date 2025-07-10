let time = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0); // 黒い背景
  translate(width / 2, height / 2); // 画面中央に移動
  time += 1; // 時間を進める
  
  // 基本のsin波
  let wave = sin(time);
  
  // サイズの変化（0から100の間）
  let circleSize = 50 + 30 * wave; // 20から80の間で変化
  
  // 色相の変化（0から360度）
  let hue = time % 360; // 虹色に変化
  
  // 明度の変化（sin波で明るくなったり暗くなったり）
  let brightness = 50 + 30 * wave; // 20から80の間
  
  // 円を描画
  fill(hue, 80, brightness, 80);
  noStroke();
  circle(0, 0, circleSize);
  
  // デバッグ情報を表示
  fill(255);
  textSize(16);
  text(`time: ${time}`, -180, -150);
  text(`wave: ${wave.toFixed(2)}`, -180, -130);
  text(`size: ${circleSize.toFixed(1)}`, -180, -110);
  text(`hue: ${hue.toFixed(0)}`, -180, -90);
  text(`brightness: ${brightness.toFixed(1)}`, -180, -70);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}