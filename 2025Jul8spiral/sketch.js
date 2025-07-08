let time = 0;
let spiralPoints = [];
let maxPoints = 200;
let currentPoint = 0;
let animationSpeed = 0.5;
let phase = "growing"; // "growing", "fading", "finished"
let fadeStartPoint = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  // 螺旋の全ての点を事前に計算
  let screenRadius = (min(width, height) / 2) * 0.9;

  for (let i = 0; i < maxPoints; i++) {
    let angle = (i * 137.5 * PI) / 180; // 黄金角

    let normalizedRadius = sqrt(i / maxPoints);
    let radius = normalizedRadius * screenRadius;

    spiralPoints.push({
      x: cos(angle) * radius,
      y: sin(angle) * radius,
      hue: (i * 1.5) % 360,
    });
  }
}

function draw() {
  background(0, 0, 10);
  translate(width / 2, height / 2);

  if (phase === "growing") {
    // 成長段階
    currentPoint += animationSpeed;
    if (currentPoint >= maxPoints) {
      currentPoint = maxPoints;
      phase = "fading";
      fadeStartPoint = 0;
    }
  } else if (phase === "fading") {
    // 消失段階
    fadeStartPoint += animationSpeed;
    if (fadeStartPoint >= maxPoints) {
      // 消失完了後、再び成長段階へ
      phase = "growing";
      currentPoint = 0;
      fadeStartPoint = 0;
    }
  }

  // 描画する範囲を決定
  let startIndex, endIndex;
  if (phase === "growing") {
    startIndex = 0;
    endIndex = currentPoint;
  } else if (phase === "fading") {
    startIndex = fadeStartPoint;
    endIndex = maxPoints;
  }

  // 螺旋を描画
  if (endIndex > startIndex + 1) {
    strokeWeight(2);
    noFill();

    for (let i = Math.floor(startIndex); i < Math.floor(endIndex) - 1; i++) {
      let point1 = spiralPoints[i];
      let point2 = spiralPoints[i + 1];

      stroke(point1.hue, 70, 85);
      line(point1.x, point1.y, point2.x, point2.y);
    }

    // 先端を強調
    if (phase === "growing") {
      // 成長中の先端
      if (currentPoint > 0) {
        let currentTip = spiralPoints[Math.floor(currentPoint) - 1];
        fill(60, 100, 100);
        noStroke();
        circle(currentTip.x, currentTip.y, 6);
      }
    } else if (phase === "fading") {
      // 消失中の先端（消える側）
      if (fadeStartPoint < maxPoints) {
        let fadingTip = spiralPoints[Math.floor(fadeStartPoint)];
        fill(0, 100, 100); // 赤い点で消える位置を表示
        noStroke();
        circle(fadingTip.x, fadingTip.y, 6);
      }
    }
  }

  // 中心点
  fill(60, 100, 100);
  noStroke();
  circle(0, 0, 8);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
