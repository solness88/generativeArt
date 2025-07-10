let growingLines = [];
let numLines = 30;
let spaceSize = 600;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);

  // 線を初期化
  for (let i = 0; i < numLines; i++) {
    growingLines.push(createGrowingLine());
  }
}

function createGrowingLine() {
  return {
    points: [],
    currentX: random(-spaceSize / 2, spaceSize / 2),
    currentY: random(-spaceSize / 2, spaceSize / 2),
    currentZ: random(-spaceSize / 2, spaceSize / 2),
    direction: random(["up", "down", "left", "right", "forward", "backward"]),
    hue: random(360),
    speed: random(1, 3),
    thickness: 1,
    changeTimer: random(60, 120),
    lifespan: random(1200, 2000),
    age: 0,
    isAlive: true,
  };
}

function draw() {
  background(0);

  // カメラ設定（固定視点）
  camera(200, -150, 200, 0, 0, 0, 0, 1, 0);

  // 軸を表示（デバッグ用）
  // drawAxes();

  for (let i = growingLines.length - 1; i >= 0; i--) {
    let lineObj = growingLines[i];

    // 年齢を増やす
    lineObj.age++;

    // アルファ値計算（フェードアウト効果）
    let alpha = 1;
    let fadeStartRatio = 0.7;
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
    strokeWeight(0.6);

    // 線を構成する全ポイントを描画
    if (lineObj.points.length > 1) {
      noFill();
      beginShape();
      for (let point of lineObj.points) {
        vertex(point.x, point.y, point.z);
      }
      endShape();
    }

    // 新しいポイントを追加（線を伸ばす）
    let newX = lineObj.currentX;
    let newY = lineObj.currentY;
    let newZ = lineObj.currentZ;

    if (lineObj.direction === "up") {
      newY -= lineObj.speed;
    } else if (lineObj.direction === "down") {
      newY += lineObj.speed;
    } else if (lineObj.direction === "left") {
      newX -= lineObj.speed;
    } else if (lineObj.direction === "right") {
      newX += lineObj.speed;
    } else if (lineObj.direction === "forward") {
      newZ += lineObj.speed;
    } else if (lineObj.direction === "backward") {
      newZ -= lineObj.speed;
    }

    // 境界チェック - 境界に達したら線を終了
    if (
      newX < -spaceSize / 2 ||
      newX > spaceSize / 2 ||
      newY < -spaceSize / 2 ||
      newY > spaceSize / 2 ||
      newZ < -spaceSize / 2 ||
      newZ > spaceSize / 2
    ) {
      // 境界に達したら線を終了
      lineObj.age = lineObj.lifespan;
      continue;
    }

    // 新しいポイントを追加
    lineObj.points.push({
      x: newX,
      y: newY,
      z: newZ,
    });

    lineObj.currentX = newX;
    lineObj.currentY = newY;
    lineObj.currentZ = newZ;

    // 方向転換タイマー
    lineObj.changeTimer--;
    if (lineObj.changeTimer <= 0) {
      // 現在の方向の逆方向を除外して選択
      let availableDirections = [];
      if (lineObj.direction === "up") {
        availableDirections = ["left", "right", "forward", "backward"];
      } else if (lineObj.direction === "down") {
        availableDirections = ["left", "right", "forward", "backward"];
      } else if (lineObj.direction === "left") {
        availableDirections = ["up", "down", "forward", "backward"];
      } else if (lineObj.direction === "right") {
        availableDirections = ["up", "down", "forward", "backward"];
      } else if (lineObj.direction === "forward") {
        availableDirections = ["up", "down", "left", "right"];
      } else if (lineObj.direction === "backward") {
        availableDirections = ["up", "down", "left", "right"];
      }

      lineObj.direction = random(availableDirections);

      // タイマーリセット
      lineObj.changeTimer = random(60, 120);
    }
  }

  // 新しい線を定期的に追加
  if (frameCount % 4 === 0) {
    growingLines.push(createGrowingLine());
  }
}

function drawAxes() {
  // X軸（赤）
  stroke(0, 100, 100);
  strokeWeight(2);
  line(0, 0, 0, 100, 0, 0);

  // Y軸（緑）
  stroke(120, 100, 100);
  line(0, 0, 0, 0, 100, 0);

  // Z軸（青）
  stroke(240, 100, 100);
  line(0, 0, 0, 0, 0, 100);
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
  // マウス位置を3D空間に変換（簡易版）
  newLine.currentX = map(mouseX, 0, width, -spaceSize / 2, spaceSize / 2);
  newLine.currentY = map(mouseY, 0, height, -spaceSize / 2, spaceSize / 2);
  newLine.currentZ = 0;
  growingLines.push(newLine);
}
