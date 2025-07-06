// Global variables
let time = 0;

function setup() {
    // Create fullscreen canvas
    createCanvas(windowWidth, windowHeight);
    
    // Set angle mode to degrees
    angleMode(DEGREES);
    
    // Set color mode to HSB (Hue, Saturation, Brightness)
    colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
    // Set background to black
    background(0, 0, 0);
    
    // Move origin to center
    translate(width / 2, height / 2);
    
    // Increment time
    time += 0.8;
    
    // Draw spiral flower
    drawSpiralFlower();
}

function drawSpiralFlower() {
    // Set number of petals and layers
    const petals = 8;
    const layers = 6;
    
    // Draw each layer
    for (let layer = 0; layer < layers; layer++) {
        // Calculate different hue for each layer
        let hue = (time * 0.5 + layer * 60) % 360;
        
        // Decrease alpha for outer layers
        let alpha = 90 - layer * 12;
        
        // Set stroke color and weight - scale stroke to screen
        stroke(hue, 80, 95, alpha);
        strokeWeight((2.5 - layer * 0.3) * (min(width, height) / 600));
        noFill();
        
        // Draw petal shape
        beginShape();
        for (let i = 0; i < 361; i++) {
            // Different rotation speed for each layer
            let angle = i + time * (layer + 1) * 0.4;
            
            // Calculate petal radius using sin function
            let petalRadius = sin(petals * angle);
            
            // Add wave effect
            let waveEffect = cos(angle * 0.08 + time * 0.3);
            
            // Calculate final radius - scale to screen size
            let baseRadius = min(width, height) * 0.4;
            let r = (baseRadius - layer * (baseRadius * 0.1)) * petalRadius * waveEffect;
            
            // Convert polar to cartesian coordinates
            let x = r * cos(angle);
            let y = r * sin(angle);
            
            // Add vertex
            vertex(x, y);
        }
        endShape();
    }
    
    // Add small glowing center point
    drawCenterGlow();
}

function drawCenterGlow() {
    // Draw center glow effect
    push();
    
    // Rotate based on time
    rotate(time * 2);
    
    // Change glow color over time
    let glowHue = (time * 1.5) % 360;
    
    // Create glow effect with multiple concentric circles - scale to screen
    for (let i = 0; i < 5; i++) {
        let baseSize = min(width, height) * 0.02;
        let radius = baseSize + i * (baseSize * 0.5);
        let alpha = 100 - i * 20;
        
        stroke(glowHue, 60, 100, alpha);
        strokeWeight((2 - i * 0.3) * (min(width, height) / 600));
        noFill();
        
        // Draw slightly deformed circles - scale to screen
        beginShape();
        for (let angle = 0; angle < 360; angle += 10) {
            let r = radius + sin(angle * 3 + time) * (baseSize * 0.3);
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
    
    pop();
}

// Handle window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}