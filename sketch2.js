let osc = new p5.Oscillator('sine');
let env;
let notes = [261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25];

let steps = new Array(8).fill(false);
let stepIndex = 0;
let bpm = 120;
let lastTick = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  env = new p5.Envelope();
  osc.amp(0);
}

function draw() {
  background(220);


  let interval = 60000 / bpm;
  if (millis() - lastTick >= interval) {
    lastTick = millis();
    if (steps[stepIndex]) {
      let f = notes[stepIndex % notes.length];
      osc.freq(f);
      osc.start();
      env.ramp(osc, 0, 1, 0);
    }
    stepIndex = (stepIndex + 1) % steps.length;
  }


  let w = width / steps.length;
  stroke(0);
  strokeWeight(1);
  for (let i = 0; i < steps.length; i++) {
    if (i === stepIndex && steps[i]) fill(70);
    else if (i === stepIndex)        fill(150);
    else if (steps[i])               fill(120);
    else                             fill(250);
    rect(i*w, 0, w, height*0.55);

    noStroke(); fill(30);
    textAlign(LEFT, TOP);
    text(nf(notes[i%notes.length], 1, 2) + ' Hz', i*w + 6, height*0.6);
    stroke(0);
  }

 
  noStroke(); fill(30);
  textAlign(LEFT, TOP);
  text('BPM: ' + bpm, 10, height - 24);
}

function mousePressed() {
  let w = width / steps.length;
  if (mouseY < height*0.55) {
    let i = floor(constrain(mouseX / w, 0, steps.length - 1));
    steps[i] = !steps[i];
  }
}
