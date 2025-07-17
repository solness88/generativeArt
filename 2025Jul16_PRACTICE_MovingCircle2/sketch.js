let radius = [];
let angle = [];
let speed = [];
let colors = []; // 色を保存する配列

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // 120個の円を生成
  // for(let i = 0; i < 600; i++){
  //   radius.push(random(10, 200));     // 10-200の範囲でランダムな半径
  //   angle.push(random(0, 360));       // 0-360の範囲でランダムな角度
  //   speed.push(random(0.3, 1.5));     // 0.3-1.5の範囲でランダムな速度
  //   colors.push({
  //     r: random(255),
  //     g: random(255),
  //     b: random(255)
  //   });
  // }
    // 120個の円を規則的に生成
    for(let i = 0; i < 600; i++){
      radius.push(10 + i * 2);          // 10, 12, 14, 16... と増加
      angle.push(random(360));                // 0, 3, 6, 9... と増加
      speed.push(random(0.5,1)); // 0.5-1.4の範囲で循環
      colors.push({
        r: random(255),
        g: random(255),
        b: random(255)
      });
    }
}

function draw() {
  background(0);
  
  translate(width/2, height/2);
  colorMode(HSB);
  
  for(let i = 0; i < radius.length; i++){
    fill(colors[i].r,colors[i].g,colors[i].b);
    
    ellipse(radius[i]*cos(angle[i]), radius[i]*sin(angle[i]), 10, 10); // 1回だけ描画

    if(angle[i] > 360){
      angle[i] = 0;
    }
    angle[i] += speed[i];

  }
}