
let time = 0;
let triangles = [];
let numTriangles = 15;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    
    generateTriangles();
}

function generateTriangles() {
    triangles = [];
    
    for (let i = 0; i < numTriangles; i++) {
        triangles.push({
            radius: random(50, min(width, height) * 0.35),
            rotationSpeed: random(0.05, 0.5), 
            baseHue: random(360),
            strokeWeight: random(1, 2.5),
            initialAngle: random(360),
            sizeOffset: random(0, 20),
            colorOffset: random(0, 10),
            selfRotationSpeed: random(0.02, 0.375) 
        });
    }
}

function draw() {
    background(0);
    
    translate(width / 2, height / 2);
    time += 0.005; // よりゆっくり
    
    drawRotatingTriangles();
}

function drawRotatingTriangles() {
    for (let i = 0; i < triangles.length; i++) {
        let tri = triangles[i];
        
        // 回転角度（公転）
        let angle = tri.initialAngle + time * tri.rotationSpeed * 3;
        
        // 三角形の位置（センター周りを回転）
        let x = tri.radius * cos(radians(angle));
        let y = tri.radius * sin(radians(angle));
        
        // 時間とともに変化するサイズ（極端に）
        let sizeWave = sin(time * 1.5 + tri.sizeOffset);
        // 0から画面サイズまで極端に変化
        let maxSize = min(width, height) * 0.8;
        let currentSize = map(sizeWave, -1, 1, 1, maxSize);
        
        // 時間とともに変化する色
        let hueShift = sin(time * 1.5 + tri.colorOffset) * 60;
        let currentHue = (tri.baseHue + hueShift) % 360;
        
        // 明度も微妙に変化
        let brightnessWave = sin(time * 1.2 + i) * 0.2 + 0.7;
        let currentBrightness = brightnessWave * 80;
        
        push();
        translate(x, y);
        
        // 三角形自体の自転（個別の速度）
        rotate(time * tri.selfRotationSpeed * 10);
        
        // スタイル設定
        noFill();
        stroke(currentHue, 60, currentBrightness);
        strokeWeight(tri.strokeWeight);
        
        // 三角形を描画
        let s = currentSize;
        triangle(0, -s/2, -s*0.43, s/2, s*0.43, s/2);
        
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}