let xLoc = [], yLoc = [];
let numSegments = 50;
let diameter = 100;

let y

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i<numSegments; i++){
    xLoc[i] = 0;
    yLoc[i] = 0;
    
  }
  fill(0);
  stroke (255);
}


function draw() {
  background(0);
  xLoc[numSegments-1] = random(width);
  yLoc[numSegments-1] = random(height);
  
  for (let i=0; i<numSegments; i++){
    xLoc[i] = xLoc[i+1];
    yLoc[i] = yLoc[i+1];
    
    let d= map (i,0,numSegments,0,PI)
    
    d = sin(d);
    
    let r = d*255
    let g = random(0,255)
    let b = 255- d*255
    
    stroke (r,g,b)
    ellipse(xLoc[i],yLoc[i], d*diameter)
  }
}

function mousePressed(){
  print (xLoc)
  
}