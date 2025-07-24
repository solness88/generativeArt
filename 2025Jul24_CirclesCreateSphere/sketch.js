let circles = [];
const numCircles = 30;
const sphereRadius = 216; // サイズを大きく調整
const circleRadius = 216; // すべての円が同じ直径

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    
    // 中央点から放射状に配置される同一直径の円を初期化
    for (let i = 0; i < numCircles; i++) {
        // 球面上の均等分布
        let phi = (i * 137.5) % 360;  // 黄金角を使った均等分布
        let theta = asin(2 * (i / numCircles) - 1) * 180 / PI; // 緯度の均等分布
        
        circles.push({
            angle: 0,
            trail: [],
            mode: 'drawing',
            eraseIndex: 0,
            color: [
                random(0, 255),
                random(0, 255),
                random(0, 255)
            ],
            speed: random(1.5, 2.5),
            phi: phi,           // 球面上の経度
            theta: theta,       // 球面上の緯度
            phase: random(0, 360), // 位相差
            maxPoints: 120      // 円一周分のポイント数（軽量化）
        });
    }
}

function draw() {
    background(0, 40); // 軌跡の余韻を残す
    
    // 中央に小さな点を表示（中心の可視化）
    push();
    fill(255, 255, 255, 150);
    noStroke();
    sphere(3);
    pop();
    
    // 全体の回転
    rotateY(frameCount * 0.3);
    rotateX(sin(frameCount * 0.4) * 15);
    
    // 各円を更新・描画
    for (let circle of circles) {
        push();
        
        // 球面上の方向ベクトルを計算
        let dirX = cos(circle.theta) * cos(circle.phi);
        let dirY = sin(circle.theta);
        let dirZ = cos(circle.theta) * sin(circle.phi);
        
        // 円の平面を球面に対して垂直に配置
        // 法線ベクトルが球面の法線と一致するように回転
        if (abs(dirY) < 0.99) {
            let upX = 0, upY = 1, upZ = 0;
            // 外積で右ベクトルを計算
            let rightX = upY * dirZ - upZ * dirY;
            let rightY = upZ * dirX - upX * dirZ;
            let rightZ = upX * dirY - upY * dirX;
            // 正規化
            let rightLen = sqrt(rightX*rightX + rightY*rightY + rightZ*rightZ);
            rightX /= rightLen; rightY /= rightLen; rightZ /= rightLen;
            
            // 外積で上ベクトルを再計算
            upX = dirY * rightZ - dirZ * rightY;
            upY = dirZ * rightX - dirX * rightZ;
            upZ = dirX * rightY - dirY * rightX;
            
            // 変換行列を適用
            applyMatrix(
                rightX, upX, dirX, 0,
                rightY, upY, dirY, 0,
                rightZ, upZ, dirZ, 0,
                0, 0, 0, 1
            );
        } else {
            // Y軸に平行な場合の特別処理
            rotateZ(circle.phi);
            rotateX(90 * (dirY > 0 ? 1 : -1));
        }
        
        updateCircle(circle);
        drawCircle(circle);
        
        pop();
    }
}

function updateCircle(circle) {
    if (circle.mode === 'drawing') {
        // 巨大な円の数式 - 中央点から同じ距離
        let t = circle.angle + circle.phase;
        let x = circleRadius * cos(t);
        let y = circleRadius * sin(t);
        let z = 0; // 円は平面上に描画
        
        circle.trail.push({x: x, y: y, z: z});
        
        circle.angle += circle.speed;
        
        // 一周したら消去モードに
        if (circle.angle >= 360) {
            circle.mode = 'erasing';
            circle.eraseIndex = 0;
        }
    } else if (circle.mode === 'erasing') {
        circle.eraseIndex += 4; // 消去速度（高速化）
        
        // 全て消えたらリセット
        if (circle.eraseIndex >= circle.trail.length) {
            circle.trail = [];
            circle.angle = 0;
            circle.mode = 'drawing';
            circle.eraseIndex = 0;
            
            // 新しい色を設定
            circle.color = [
                random(0, 255),
                random(0, 255),
                random(0, 255)
            ];
            circle.speed = random(1.5, 2.5);
        }
    }
}

function drawCircle(circle) {
    if (circle.trail.length > 1) {
        // メイン線（細い線）
        strokeWeight(2);
        noFill();
        
        beginShape();
        for (let i = circle.eraseIndex; i < circle.trail.length; i++) {
            let point = circle.trail[i];
            
            // 進行方向に向かって明るくする
            let progress = (i - circle.eraseIndex) / (circle.trail.length - circle.eraseIndex);
            let brightness = 0.4 + progress * 0.6;
            let alpha = 120 + progress * 135;
            
            stroke(
                circle.color[0] * brightness, 
                circle.color[1] * brightness, 
                circle.color[2] * brightness, 
                alpha
            );
            
            vertex(point.x, point.y, point.z);
        }
        endShape();
        
        // 細いハイライト線
        strokeWeight(0.5);
        stroke(255, 255, 255, 80);
        beginShape();
        for (let i = Math.max(circle.eraseIndex, circle.trail.length - 30); i < circle.trail.length; i++) {
            let point = circle.trail[i];
            vertex(point.x, point.y, point.z);
        }
        endShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}