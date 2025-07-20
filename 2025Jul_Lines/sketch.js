let growingLines = [];
let numLines = 40;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    
    // 線を初期化
    for (let i = 0; i < numLines; i++) {
        growingLines.push(createGrowingLine());
    }
}

function createGrowingLine() {
    return {
        points: [],
        currentX: random(width),
        currentY: random(height),
        direction: random(["up", "down", "left", "right"]),
        hue: random(360),
        speed: random(1.5, 3.75), // スピードを1.5倍に
        thickness: random(0.5, 32), // 最太線を倍に
        changeTimer: random(60, 150)
    };
}

function draw() {
    background(0);
    
    for (let i = 0; i < growingLines.length; i++) {
        let lineObj = growingLines[i];
        
        // 線を描画
        stroke(lineObj.hue, 75, 90);
        strokeWeight(lineObj.thickness);
        
        // 線を構成する全ポイントを描画
        if (lineObj.points.length > 1) {
            noFill();
            beginShape();
            for (let point of lineObj.points) {
                vertex(point.x, point.y);
            }
            endShape();
        }
        
        // 新しいポイントを追加（線を伸ばす）
        let newX = lineObj.currentX;
        let newY = lineObj.currentY;
        
        if (lineObj.direction === "up") {
            newY -= lineObj.speed;
        } else if (lineObj.direction === "down") {
            newY += lineObj.speed;
        } else if (lineObj.direction === "left") {
            newX -= lineObj.speed;
        } else if (lineObj.direction === "right") {
            newX += lineObj.speed;
        }
        
        // 新しいポイントを追加
        lineObj.points.push({
            x: newX,
            y: newY
        });
        
        // 線の長さを制限してメモリ使用量を抑制
        if (lineObj.points.length > 200) {
            lineObj.points.shift();
        }
        
        lineObj.currentX = newX;
        lineObj.currentY = newY;
        
        // 方向転換タイマー
        lineObj.changeTimer--;
        if (lineObj.changeTimer <= 0) {
            // 垂直方向転換
            if (lineObj.direction === "up" || lineObj.direction === "down") {
                lineObj.direction = random(["left", "right"]);
            } else {
                lineObj.direction = random(["up", "down"]);
            }
            
            // タイマーリセット
            lineObj.changeTimer = random(60, 150);
        }
    }
    
    // 線の数を制限してパフォーマンスを維持
    if (growingLines.length > 500) {
        growingLines.splice(0, 50); // 古い線を50本削除
    }
    
    // 新しい線を定期的に追加（頻度をさらに倍に）
    if (frameCount % 3 === 0) {
        growingLines.push(createGrowingLine());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (key === " ") {
        // スペースキーで全ての線をクリア
        growingLines = [];
    }
}

function mousePressed() {
    // クリックで新しい線を追加
    let newLine = createGrowingLine();
    newLine.currentX = mouseX;
    newLine.currentY = mouseY;
    growingLines.push(newLine);
}