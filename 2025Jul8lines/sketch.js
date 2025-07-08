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
    speed: random(1, 2.5),
    thickness: random(2, 4),
    changeTimer: random(60, 150),
    lifespan: random(800, 1500), // 生存時間
    age: 0, // 現在の年齢
    isAlive: true,
  };
}

function draw() {
  background(0);

  for (let i = growingLines.length - 1; i >= 0; i--) {
    let lineObj = growingLines[i];

    // 年齢を増やす
    lineObj.age++;

    // アルファ値計算（フェードアウト効果）
    let alpha = 1;
    let fadeStartRatio = 0.7; // 70%の時点からフェード開始

    if (lineObj.age > lineObj.lifespan * fadeStartRatio) {
      let fadeProgress =
        (lineObj.age - lineObj.lifespan * fadeStartRatio) /
        (lineObj.lifespan * (1 - fadeStartRatio));
      alpha = 1 - fadeProgress;
      alpha = Math.max(0, alpha);
    }

    // 完全に消えたら削除
    if (lineObj.age >= lineObj.lifespan) {
      growingLines.splice(i, 1);
      continue;
    }

    // 線を描画
    stroke(lineObj.hue, 75, 90, alpha * 100);
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
      y: newY,
    });

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

  // 新しい線を定期的に追加
  if (frameCount % 20 === 0) {
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
