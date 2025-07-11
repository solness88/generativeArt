function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100); // HSBカラーモードに変更
 }
 
 let angle = 0;
 let currentAngle = 0;
 let radius = 50;
 
 function draw() {
  background(0);
  
  // 画面サイズに応じて円の数と間隔を計算
  let spacing = 120;
  let cols = floor(width / spacing);
  let rows = floor(height / spacing);
  
  // 画面全体に均等配置するための開始位置
  let startX = (width - (cols - 1) * spacing) / 2;
  let startY = (height - (rows - 1) * spacing) / 2;
  
  // 縦横に円を並べる
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = startX + col * spacing;
      let y = startY + row * spacing;
      
      translate(x, y);
      
      // 円ごとに異なるタイミング
      let circleAngle = (currentAngle + (row * cols + col) * 30) % 360;
      
      // 円ごとに異なる色（位置に基づいたランダム色）
      let hue = (row * cols + col) * 37 % 360; // 37で掛けて色を分散
      
      // 0度から360度まで20度刻みで描画
      for (let i = 0; i < 18; i++) {
        let angle = i * 20;
        
        let angleDiff = abs(circleAngle - angle);
        
        if (angleDiff > 180) {
          angleDiff = 360 - angleDiff;
        }
        
        let alpha = map(angleDiff, 0, 180, 100, 10); // HSBに合わせて調整
        
        let circleX = radius * cos(angle);
        let circleY = radius * sin(angle);
        
        fill(hue, 80, 90, alpha); // 色相、彩度、明度、透明度
        noStroke();
        ellipse(circleX, circleY, 10, 10);
      }
      
      translate(-x, -y);
    }
  }
  
  currentAngle += 2;
  if (currentAngle >= 360) {
    currentAngle = 0;
  }
 }