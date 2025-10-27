let notes = [261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25];
let cols = 8;
let rows = 8;

let grid = [];
let stepIndex = 0;
let bpm = 120;
let lastTick = 0;

let osc = [];
let env = [];

let gridTop, gridLeft, gridW, gridH;
let sliderX, sliderY, sliderW = 360, sliderH = 16;
let draggingSlider = false;
let bpmMin = 60, bpmMax = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let c = 0; c < cols; c++) grid[c] = new Array(rows).fill(false);
  for (let r = 0; r < rows; r++) {
    let o = new p5.Oscillator('sine'); o.amp(0); o.start(); osc[r] = o;
    let e = new p5.Envelope(); e.setADSR(0.01, 0.1, 0.0, 0.1); e.setRange(0.7, 0); env[r] = e;
  }
  layout();
}

function layout() {
  gridLeft = max(80, width*0.05);
  gridTop = max(60, height*0.08);
  gridW = width - gridLeft*2;
  gridH = height*0.6;
  sliderX = (width - sliderW)/2;
  sliderY = gridTop + gridH + 70;
}

function draw() {
  background(10);

  let interval = 60000 / bpm;
  if (millis() - lastTick >= interval) {
    lastTick = millis();
    for (let r = 0; r < rows; r++) {
      if (grid[stepIndex][r]) {
        osc[r].freq(notes[r % notes.length]);
        env[r].play(osc[r], 0, 0.1);
      }
    }
    stepIndex = (stepIndex + 1) % cols;
  }

  drawGrid();
  drawSlider();

  fill(180);
  textAlign(RIGHT, CENTER);
  textSize(14);
  let ch = gridH / rows;
  text('C4', gridLeft - 12, gridTop + ch * 0.5);
  text('D4', gridLeft - 12, gridTop + ch * 1.5);
  text('E4', gridLeft - 12, gridTop + ch * 2.5);
  text('F4', gridLeft - 12, gridTop + ch * 3.5);
  text('G4', gridLeft - 12, gridTop + ch * 4.5);
  text('A4', gridLeft - 12, gridTop + ch * 5.5);
  text('B4', gridLeft - 12, gridTop + ch * 6.5);
  text('C5', gridLeft - 12, gridTop + ch * 7.5);
}

function drawGrid() {
  let cw = gridW / cols;
  let ch = gridH / rows;

  stroke(60); strokeWeight(2);
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let x = gridLeft + c*cw;
      let y = gridTop + r*ch;

      if (c === stepIndex && grid[c][r]) fill(180);
      else if (c === stepIndex)          fill(60);
      else if (grid[c][r])               fill(120);
      else                               fill(25);

      rect(x, y, cw, ch);
    }
  }

  noFill(); stroke(180); strokeWeight(3);
  rect(gridLeft, gridTop, gridW, gridH);
}

function drawSlider() {
  fill(220); noStroke(); textAlign(CENTER, BOTTOM);
  text('BPM: ' + floor(bpm), sliderX + sliderW/2, sliderY - 18);

  stroke(100); strokeWeight(3);
  line(sliderX, sliderY, sliderX + sliderW, sliderY);

  let t = (bpm - bpmMin) / (bpmMax - bpmMin);
  let handleX = sliderX + constrain(t, 0, 1) * sliderW;

  noStroke(); fill(245);
  circle(handleX, sliderY, sliderH);
}

function mousePressed() {
  userStartAudio();
  let cw = gridW / cols;
  let ch = gridH / rows;

  if (mouseX >= gridLeft && mouseX <= gridLeft+gridW && mouseY >= gridTop && mouseY <= gridTop+gridH) {
    let c = floor((mouseX - gridLeft) / cw);
    let r = floor((mouseY - gridTop) / ch);
    grid[c][r] = !grid[c][r];
    return;
  }

  if (mouseX >= sliderX && mouseX <= sliderX+sliderW && abs(mouseY - sliderY) <= sliderH) {
    draggingSlider = true;
    updateBPMFromMouse();
  }
}

function mouseDragged() {
  if (draggingSlider) updateBPMFromMouse();
}

function mouseReleased() {
  draggingSlider = false;
}

function updateBPMFromMouse() {
  let t = (mouseX - sliderX) / sliderW;
  bpm = constrain(bpmMin + t*(bpmMax - bpmMin), bpmMin, bpmMax);
}
