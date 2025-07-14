let objects = [];
const radius = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(0);

  let spacingX = radius * 2.8;
  let spacingY = radius * 2.8;
  
  let gridCols = Math.floor(width / spacingX);
  let gridRows = Math.floor(height / spacingY);

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let obj = {
        x: col * spacingX + spacingX/2,
        y: row * spacingY + spacingY/2,
        angleX: 0,
        angleY: 0,
        angleX2: 180,
        angleY2: 180,
        color1: color(random(255), random(255), random(255)),
        color2: color(random(255), random(255), random(255))
      };
      
      objects.push(obj);
    }
  }
}

function draw() {
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);
  
  for (let obj of objects) {
    push();
    translate(obj.x, obj.y);
    
    // 1つ目の円
    let circleX = radius * cos(obj.angleX);
    let circleY = radius * sin(obj.angleY);
    fill(obj.color1);
    ellipse(circleX, circleY, 20, 20);
    
    // 2つ目の円
    let circleX2 = radius * cos(obj.angleX2);
    let circleY2 = radius * sin(obj.angleY2);
    fill(obj.color2);
    ellipse(circleX2, circleY2, 20, 20);
    
    obj.angleX += 1;
    obj.angleY += 2;
    obj.angleX2 += 1;
    obj.angleY2 += 2;
    
    pop();
  }
}