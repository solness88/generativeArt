// シンプルな太陽系アニメーション
let angle = 0; // 惑星が太陽の周りを回る角度

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // 3D描画用のキャンバス
}

function draw() {
    background(20, 20, 50); // 濃い青の宇宙背景
    
    // カメラの位置を設定（少し上から見下ろす感じ）
    camera(0, -200, 300, 0, 0, 0, 0, 1, 0);
    
    // 角度を少しずつ増やして回転させる
    angle += 0.02;
    
    // ライトを設定
    ambientLight(50, 50, 50); // 全体を少し明るくする光
    pointLight(255, 255, 255, 0, 0, 0); // 太陽の位置に白い光
    
    // 太陽を描画
    push(); // 設定を保存
    // 太陽は自分で光るので、ライトをオフにして明るく表示
    noLights();
    ambientLight(255, 255, 255); // 真っ白な環境光で明るく照らす
    fill(255, 255, 0); // 明るい黄色
    noStroke(); // 線なし
    rotateY(frameCount * 0.01); // ゆっくり自転
    sphere(30); // 半径30の球体
    pop(); // 設定を復元
    
    // 惑星用のライトを再設定
    ambientLight(50, 50, 50); // 全体を少し明るくする光
    pointLight(255, 255, 255, 0, 0, 0); // 太陽の位置に白い光
    
    // 4つの惑星を描画（90度ずつずれて配置）
    
    // 1番目の惑星（青色）
    push();
    rotateY(angle); // 基本角度で回転
    translate(100, 0, 0); // 太陽から100px離れた位置
    fill(0, 100, 255); // 青色
    noStroke();
    rotateY(angle * 5); // 自転
    sphere(15);
    pop();
    
    // 2番目の惑星（赤色、90度ずれ）
    push();
    rotateY(angle + PI/2); // 90度（PI/2ラジアン）ずれて回転
    translate(100, 0, 0);
    fill(255, 100, 100); // 赤色
    noStroke();
    rotateY(angle * 5);
    sphere(15);
    pop();
    
    // 3番目の惑星（緑色、180度ずれ）
    push();
    rotateY(angle + PI); // 180度（PIラジアン）ずれて回転
    translate(100, 0, 0);
    fill(100, 255, 100); // 緑色
    noStroke();
    rotateY(angle * 5);
    sphere(15);
    pop();
    
    // 4番目の惑星（紫色、270度ずれ）
    push();
    rotateY(angle + PI*3/2); // 270度（PI*3/2ラジアン）ずれて回転
    translate(100, 0, 0);
    fill(255, 100, 255); // 紫色
    noStroke();
    rotateY(angle * 5);
    sphere(15);
    pop();
}