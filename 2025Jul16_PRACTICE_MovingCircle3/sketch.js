let radius = [];
let angle = [];
let color = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  translate(width/2, height/2)
  background(0);

  for(let i=0;i<10;i++){
    radius.push(i*80)
    angle.push(random(360))
    color.push({r:random(255),g:random(255),b:random(255)})
  };
}

function draw() {
  translate(width/2, height/2)
  background(0);

  for(let i=0;i<10;i++){
    stroke(255);
    strokeWeight(0.5);
    noFill();
    ellipse(0, 0, radius[i], radius[i]);    
  }

  for(let j=0; j<radius.length;j++){
    // let circleX = (radius[j] / 2) * cos(angle[j]); // 半径を2で割る
    // let circleY = (radius[j] / 2) * sin(angle[j]); // 半径を2で割る

    // fill(color[j].r,color[j].g,color[j].b);
    // noStroke();
    // ellipse(circleX, circleY, 30, 30);
    for(let k = 0; k < 6; k++){
      let offsetAngle = angle[j] + k * 60; // 120度ずつずらして配置
      let circleX = (radius[j] / 2) * cos(offsetAngle);
      let circleY = (radius[j] / 2) * sin(offsetAngle);
      
    fill(color[j].r,color[j].g,color[j].b);
    noStroke();
      ellipse(circleX, circleY, 30, 30);
  }
    
    angle[j] += (j + 1) * 0.1; // 速度を調整
  }
}