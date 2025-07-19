let circleAngle = [];
let circleColor = [];
let nextSpawnTime = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    nextSpawnTime = frameCount + random(10, 60);
}

function draw() {
    background(0);
    
    camera(0, 0, 300, 0, 0, 0, 0, 1, 0); // カメラも近づける
    
    rotateY(frameCount * 0.5);
    
    // 螺旋を描写（サイズ縮小）
    stroke(255);
    strokeWeight(0.5);
    noFill();
    beginShape();
    for (let angle = 0; angle < 1800; angle += 5) { 
        let radius = 15 + angle * 0.05; // 半分のサイズ（30→15, 0.1→0.05）
        let x = radius * cos(angle);
        let y = radius * sin(angle);
        vertex(x, y, 0);
    }
    endShape();

    // ボール生成
    if (frameCount >= nextSpawnTime) {
        circleAngle.push(0);
        circleColor.push({r:random(255), g:random(255), b:random(255)});
        nextSpawnTime = frameCount + random(10, 90);
    }

    // ボールを描写（サイズ縮小）
    noStroke();
    for(let i = circleAngle.length - 1; i >= 0; i--){
        fill(circleColor[i].r, circleColor[i].g, circleColor[i].b); 
        let circleRadius = 15 + circleAngle[i] * 0.05; // 同じ比率で縮小
        let circleX = circleRadius * cos(circleAngle[i]);
        let circleY = circleRadius * sin(circleAngle[i]);
        
        push();
        translate(circleX, circleY, 0);
        sphere(5); // ボールも小さく（10→5）
        pop();
        
        circleAngle[i] += 3;

        if(circleAngle[i] > 1800){
            circleAngle.splice(i, 1);
            circleColor.splice(i, 1);
        }
    }
}