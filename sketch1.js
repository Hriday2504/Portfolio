let pacman, ghosts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
  pacman = new Pacman(width/2, height/2);
  for (let i = 0; i < 5; i++) ghosts.push(new Ghost(random(width), random(height)));
}

function draw() {
  background(20);

  pacman.display();
  pacman.update();
  

  for (let i = ghosts.length - 1; i >= 0; i--) {
    let g = ghosts[i];
    g.update();
    g.display();
    if (pacman.canEat(g)) {
      pacman.grow();
      ghosts.splice(i, 1);
    }
  }
}

function mousePressed() {
  ghosts.push(new Ghost(mouseX, mouseY));
}

class Pacman {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.baseSize = min(width, height) * 0.18;
    this.maxSize  = min(width, height) * 0.45;
    this.bodyDiameter = this.baseSize;
    let ang = random(360);
    this.speed = 2.2;
    this.xV = cos(ang) * this.speed;
    this.yV = sin(ang) * this.speed;
    this.heading = random(360);
    this.spinSpeed = random([-2.5, -2, -1.5, 1.5, 2, 2.5]);
    this.col = color(255, 210, 0);
    this.mouth = 32;
  }

  update() {
    this.x += this.xV;
    this.y += this.yV;
    this.heading += this.spinSpeed;
    let r = this.bodyDiameter * 0.5;
    if (this.x < -r) this.x = width + r;
    if (this.x > width + r) this.x = -r;
    if (this.y < -r) this.y = height + r;
    if (this.y > height + r) this.y = -r;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.heading);
    fill(this.col);
    arc(0, 0, this.bodyDiameter, this.bodyDiameter, this.mouth/2, 360 - this.mouth/2, PIE);
    fill(20);
    let r = this.bodyDiameter * 0.4;
    ellipse(r*0.18, -r*0.52, this.bodyDiameter * 0.07);
    pop();
  }

  canEat(g) {
    let dx = g.x - this.x, dy = g.y - this.y;
    let d = sqrt(dx*dx + dy*dy);
    return d < this.bodyDiameter*0.48 + g.radius*0.6;
  }

  grow() {
    this.bodyDiameter = min(this.bodyDiameter + 6, this.maxSize);
  }
}

class Ghost {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.radius = random(12, 16);
    this.xV = random(-1, 1);
    this.yV = random(-1, 1);
    this.maxSpeed = 2;
    this.bodyCol = color(random(90,255), random(90,255), random(90,255));
    this.eyeCol = color(255);
    this.pupilCol = color(40);
  }

  update() {
    this.xV += random(-0.03, 0.03);
    this.yV += random(-0.03, 0.03);
    let sp = sqrt(this.xV*this.xV + this.yV*this.yV) || 0.0001;
    if (sp > this.maxSpeed) {
      this.xV = (this.xV/sp) * this.maxSpeed;
      this.yV = (this.yV/sp) * this.maxSpeed;
    }
    this.x += this.xV; this.y += this.yV;
    if (this.x < this.radius) { this.x = this.radius; this.xV *= -1; }
    if (this.x > width - this.radius) { this.x = width - this.radius; this.xV *= -1; }
    if (this.y < this.radius) { this.y = this.radius; this.yV *= -1; }
    if (this.y > height - this.radius) { this.y = height - this.radius; this.yV *= -1; }
  }

  display() {
    push();
    translate(this.x, this.y);
    let r = this.radius;
    fill(this.bodyCol);
    rectMode(CENTER);
    rect(0, r*0.35, r*1.55, r*1.55, 3);
    rect(0, r*0.35, r*2, r*1.55, 3);
    arc(0, -r*0.08, r*2, r*2, 180, 360, CHORD);

    let scallopD = r * 0.6;
    let scallopY = r * 1.02;
    let offset   = r * 0.67;
    for (let i = -1; i <= 1; i++) {
      arc(i * offset, scallopY, scallopD, scallopD, 0, 180, CHORD);
    }

    fill(this.eyeCol);
    ellipse(-r*0.4, -r*0.1, r*0.55, r*0.55);
    ellipse( r*0.4, -r*0.1, r*0.55, r*0.55);
    fill(this.pupilCol);
    ellipse(-r*0.4, -r*0.1, r*0.25, r*0.25);
    ellipse( r*0.4, -r*0.1, r*0.25, r*0.25);
    pop();
  }
}
