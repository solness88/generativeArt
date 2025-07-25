let circleAngle = [];
let circleColor = [];
let nextSpawnTime = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    
    // 最初から10個のボールを奥の方（小さい角度）に配置
    for (let i = 0; i < 10; i++) {
        circleAngle.push(i * 30); // 0, 30, 60, 90... 270度まで（全て奥側）
        circleColor.push({r:random(0, 255), g:random(0, 255), b:random(0, 255)});
    }
    
    nextSpawnTime = frameCount + 30; // 30フレーム後に次のボール
}

function draw() {
    background(0);
    
    // カメラを固定（回転なし）
    camera(0, 0, 300, 0, 0, 0, 0, 1, 0);

    // 白い螺旋線を描写（極細）
    stroke(255);
    strokeWeight(0.5); // 極細に変更
    noFill();
    beginShape();
    for (let angle = 0; angle < 1800; angle += 2) {
        let circleRadius = 5 + angle * 0.1;
        let x = circleRadius * cos(angle);
        let y = circleRadius * sin(angle);
        let z = -300 + (angle / 1800) * 400;
        vertex(x, y, z);
    }
    endShape();

    // 新しいボールを生成（奥から次々と）
    if (frameCount >= nextSpawnTime) {
        circleAngle.push(0); // 角度0（奥の中心）から開始
        circleColor.push({r:random(100, 255), g:random(100, 255), b:random(100, 255)});
        nextSpawnTime = frameCount + random(20, 60); // ランダムな間隔で生成
    }

    // ボールを描写（奥から手前へ広がる）
    noStroke();
    for(let i = 0; i < circleAngle.length; i++){
        fill(circleColor[i].r, circleColor[i].g, circleColor[i].b);

        let angle = circleAngle[i];
        // 奥から手前に来るほど螺旋が大きくなる
        let depthFactor = angle / 1800; // 0から1の値
        let circleRadius = 5 + angle * 0.1; // より大きく広がる
        let circleX = circleRadius * cos(angle);
        let circleY = circleRadius * sin(angle);
        // Z軸：奥（-300）から手前（100）へ
        let circleZ = -300 + (angle / 1800) * 400;

        push();
        translate(circleX, circleY, circleZ);
        // 手前に来るほどボールも大きく
        let ballSize = 3 + depthFactor * 8;
        sphere(ballSize);
        pop();

        circleAngle[i] += 1.5;

        if(circleAngle[i] > 1800){
            circleAngle.splice(i, 1); // ボールを削除
            circleColor.splice(i, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}