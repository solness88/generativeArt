let objects = []; // 複数の物体を保存
let gridCols = 3; // 横の数
let gridRows = 2; // 縦の数

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
  // 格子状に物体を配置
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      objects.push({
        x: (col - 1) * 300, // 横の間隔
        y: (row - 0.5) * 200, // 縦の間隔
        z: 0,
        angleX: 0,
        angleY: 0,
        radius: 50, // 半分のサイズ
        trail: [],
        mode: 'drawing',
        eraseIndex: 0,
        color: [random(100, 255), random(100, 255), random(100, 255)], // ランダム色
        rotationX: random(0.1, 0.5), // 個別の回転速度
        rotationY: random(0.1, 0.5),
        rotationZ: random(0.1, 0.5),
        currentRotX: 0, // 現在の回転角度
        currentRotY: 0,
        currentRotZ: 0
      });
    }
  }
}

function draw() {
  background(0);
  
  // 全体のカメラは固定
  rotateX(30);
  
  // 各物体を処理
  for (let obj of objects) {
    push();
    translate(obj.x, obj.y, obj.z);
    
    // 各物体が個別に回転
    obj.currentRotX += obj.rotationX;
    obj.currentRotY += obj.rotationY;
    obj.currentRotZ += obj.rotationZ;
    rotateX(obj.currentRotX);
    rotateY(obj.currentRotY);
    rotateZ(obj.currentRotZ);
    
    if (obj.mode === 'drawing') {
      let circleX = obj.radius * cos(obj.angleX);
      let circleY = obj.radius * sin(obj.angleY);
      let circleZ = 25 * sin(obj.angleX * 2);
      
      obj.trail.push({x: circleX, y: circleY, z: circleZ});
      
      obj.angleX += 0.5;
      obj.angleY += 1;
      
      if (obj.angleX >= 720) {
        obj.mode = 'erasing';
        obj.eraseIndex = 0;
      }
    } else if (obj.mode === 'erasing') {
      obj.eraseIndex += 3;
      
      if (obj.eraseIndex >= obj.trail.length) {
        obj.trail = [];
        obj.angleX = 0;
        obj.angleY = 0;
        obj.mode = 'drawing';
        obj.eraseIndex = 0;
      }
    }
    
    // 軌跡を描画
    if (obj.trail.length > 0) {
      stroke(obj.color[0], obj.color[1], obj.color[2]);
      strokeWeight(2);
      noFill();
      beginShape();
      for (let i = obj.eraseIndex; i < obj.trail.length; i++) {
        vertex(obj.trail[i].x, obj.trail[i].y, obj.trail[i].z);
      }
      endShape();
    }
    
    pop();
  }
}