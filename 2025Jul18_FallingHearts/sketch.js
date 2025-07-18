let hearts = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background(0);
    camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
    
    // 各ハートを更新して描画
    for (let i = hearts.length - 1; i >= 0; i--) {
        updateHeart(hearts[i]);
        drawHeart(hearts[i]);
        
        // 画面下に消えたハートを削除
        if (hearts[i].y > height/2 + 100) {
            hearts.splice(i, 1);
        }
    }
    
    // 新しいハートを追加
    if (frameCount % 2 === 0) {
        hearts.push(createHeart());
    }
}

function createHeart() {
    return {
        x: random(-width/4, width/4),
        y: -height/2 - 50,
        z: random(-100, 100),
        fallSpeed: random(1, 3),
        rotationX: 0,
        rotationY: 0,
        rotSpeedX: random(0.01, 0.05),
        rotSpeedY: random(0.01, 0.03),
        size: random(0.3, 0.8),
        color: [random(255), random(255), random(255)]
    };
}

function updateHeart(heart) {
    heart.y += heart.fallSpeed;
    heart.rotationX += heart.rotSpeedX;
    heart.rotationY += heart.rotSpeedY;
    
    // 左右に少し揺れる
    heart.x += sin(frameCount * 0.01 + heart.y * 0.01) * 0.5;
}

function drawHeart(heart) {
    push();
    translate(heart.x, heart.y, heart.z);
    rotateX(heart.rotationX);
    rotateY(heart.rotationY);
    scale(heart.size);
    
    fill(heart.color[0], heart.color[1], heart.color[2]);
    noStroke();
    
    beginShape();
    for (let i = 0; i <= 50; i++) {
        let t = map(i, 0, 50, 0, TWO_PI);
        let x = 16 * pow(sin(t), 3) * 2;
        let y = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) * 2;
        vertex(x, y);
    }
    endShape(CLOSE);
    
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}