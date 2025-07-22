// シンプルな太陽系アニメーション
let angle = 0; // 惑星が太陽の周りを回る角度
let sunTexture; // ← この行を追加
let planets = []; // ← この行を追加（惑星データを格納する配列）
let stars = []; // ← この行を追加（星の位置を格納する配列）

function preload() {
    sunTexture = loadImage('./assets/sun.jpg'); // ← この関数全体を追加
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // 3D描画用のキャンバス

    // 星の位置をランダムに生成（200個）
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: random(-1000, 1000),    // 広範囲のX座標
            y: random(-1000, 1000),      // 広範囲のY座標
            z: random(-1500, -500),    // 太陽系の後ろに配置
            size: random(1, 3)         // 星のサイズ
        });
    }

    // 8つの惑星の初期設定を3D完全ランダムに生成
    for (let i = 0; i < 16; i++) {
        planets.push({
            angleX: random(0, TWO_PI),              // ← X軸回転角度を追加
            angleY: random(0, TWO_PI),              // ← Y軸回転角度（既存）
            angleZ: random(0, TWO_PI),              // ← Z軸回転角度を追加
            distance: random(80, 150),              
            speedX: random(-0.015, 0.015),          // ← 半分の速度
            speedY: random(-0.015, 0.015),          // ← 半分の速度
            speedZ: random(-0.015, 0.015),          // ← 半分の速度
            rotationSpeed: random(-10, 10),         
            size: random(8, 18),                    
            color: [random(0, 255), random(0, 255), random(0, 255)]
        });
    }
}

function draw() {
    background(0); 
    
    // カメラの位置を設定（少し上から見下ろす感じ）
    camera(0, -200, 300, 0, 0, 0, 0, 1, 0);
    
    // 角度を少しずつ増やして回転させる
    angle += 0.02;
    
    // ライトを設定
    ambientLight(50, 50, 50); // 全体を少し明るくする光
    pointLight(255, 255, 255, 0, 0, 0); // 太陽の位置に白い光
    

    push();
    fill(255, 255, 255); // 白い星
    noStroke();
    for (let i = 0; i < stars.length; i++) {
        push();
        translate(stars[i].x, stars[i].y, stars[i].z);
        sphere(stars[i].size);
        pop();
    }
    pop();

    // 太陽を描画
    push(); // 設定を保存
    // 太陽は自分で光るので、ライトをオフにして明るく表示
    noLights();
    ambientLight(255, 255, 255); // 真っ白な環境光で明るく照らす
    texture(sunTexture); // 画像テクスチャを適用
    noStroke(); // 線なし
    rotateY(frameCount * 0.01); // ゆっくり自転
    sphere(30); // 半径30の球体
    pop(); // 設定を復元
    
    // 惑星用のライトを再設定
    ambientLight(50, 50, 50); // 全体を少し明るくする光
    pointLight(255, 255, 255, 0, 0, 0); // 太陽の位置に白い光
    
    // 8つの惑星を描画（3Dランダムな動き）
    for (let i = 0; i < planets.length; i++) {
        let planet = planets[i];
        
        // 各軸の角度を更新
        planet.angleX += planet.speedX;  // ← X軸回転を追加
        planet.angleY += planet.speedY;  // ← 既存のangle更新を変更
        planet.angleZ += planet.speedZ;  // ← Z軸回転を追加
        
        push();
        rotateX(planet.angleX);          // ← X軸回転を追加
        rotateY(planet.angleY);          // ← 既存
        rotateZ(planet.angleZ);          // ← Z軸回転を追加
        translate(planet.distance, 0, 0);
        fill(planet.color[0], planet.color[1], planet.color[2]);
        noStroke();
        rotateY(angle * planet.rotationSpeed);
        sphere(planet.size);
        pop();
    }

}