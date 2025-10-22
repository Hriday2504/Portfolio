// ===== Background =====
const bg = (p) => {
  let xLoc = [], yLoc = [];
  const numSegments = 50;
  const diameter = 100;

  p.setup = () => {
    let c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.position(0, 0);
    c.style('z-index', -1);
    c.style('position', 'fixed');
    p.noFill();
    p.stroke(255);
    for (let i = 0; i < numSegments; i++) {
      xLoc[i] = 0;
      yLoc[i] = 0;
    }
  };

  p.draw = () => {
    p.background(0);
    for (let i = 0; i < numSegments - 1; i++) {
      xLoc[i] = xLoc[i + 1];
      yLoc[i] = yLoc[i + 1];
    }
    xLoc[numSegments - 1] = p.random(p.width);
    yLoc[numSegments - 1] = p.random(p.height);

    for (let i = 0; i < numSegments; i++) {
      let d = p.map(i, 0, numSegments - 1, 0, p.PI);
      d = p.sin(d);
      const r = d * 255;
      const g = 180 + d * 60;
      const b = 255 - d * 255;
      p.stroke(r, g, b);
      p.ellipse(xLoc[i], yLoc[i], d * diameter);
    }
  };

  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};
new p5(bg);

// ===== Cursor =====
const cursor = (p) => {
  let xLoc = [], yLoc = [];
  let numSegments = 60;
  let headX, headY;
  let diameter = 30;
  let c1, c2;

  p.setup = () => {
    let c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.position(0, 0);
    c.style('position', 'fixed');
    c.style('z-index', '9999');
    c.style('pointer-events', 'none');
    p.noCursor();
    p.noStroke();

    headX = p.width / 2;
    headY = p.height / 2;

    for (let i = 0; i < numSegments; i++) {
      xLoc[i] = headX;
      yLoc[i] = headY;
    }
    randomizeColors();
  };

  function randomizeColors() {
    c1 = p.color(p.random(255), p.random(255), p.random(255));
    c2 = p.color(p.random(255), p.random(255), p.random(255));
  }

  p.draw = () => {
    p.clear();
    headX = p.lerp(headX, p.mouseX, 0.1);
    headY = p.lerp(headY, p.mouseY, 0.1);

    for (let i = 0; i < numSegments - 1; i++) {
      xLoc[i] = xLoc[i + 1];
      yLoc[i] = yLoc[i + 1];
    }
    xLoc[numSegments - 1] = headX;
    yLoc[numSegments - 1] = headY;

    for (let i = 0; i < numSegments; i++) {
      let t = i / (numSegments - 1);
      let col = p.lerpColor(c1, c2, t);
      let size = p.lerp(5, diameter, t);

      p.fill(p.red(col), p.green(col), p.blue(col), 40);
      p.ellipse(xLoc[i], yLoc[i], size * 2);

      p.fill(col);
      p.ellipse(xLoc[i], yLoc[i], size);
    }
  };

  p.mousePressed = () => randomizeColors();
  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};
new p5(cursor);
