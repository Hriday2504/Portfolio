let columns = 10;
let rows = 10;

let rects = [];
let ships = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let index = 0;
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      rects[index] = 0;
      ships[index] = 0;
      index++;
    }
  }

  placeShips(4, 4);
}

function draw() {
  background(0);

  let index = 0;
  stroke(80); 
  strokeWeight(1);

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      
      if (
        mouseX > (x * width) / columns &&
        mouseX < ((x + 1) * width) / columns &&
        mouseY > (y * height) / rows &&
        mouseY < ((y + 1) * height) / rows &&
        mouseIsPressed == true
      ) {
        rects[index] = ships[index] == 1 ? 2 : 1;
      }

     
      if (rects[index] == 0) fill(0);
     
      else if (rects[index] == 1) fill(255);
     
      else fill(255, 0, 0);

      rect(
        (x * width) / columns,
        (y * height) / rows,
        width / columns,
        height / rows
      );

      index++;
    }
  }
}

function mouseReleased() {
  print(rects);
}


function placeShips(count, length) {
  let placed = 0; 

  while (placed < count) {
    
    let orientation = floor(random(2)); 
    let horizontal = (orientation === 0);

    
    let sx, sy;
    if (horizontal) {
      sx = floor(random(columns - length));
      sy = floor(random(rows));
    } else {
      sx = floor(random(columns));
      sy = floor(random(rows - length));
    }

    
     for (let i = 0; i < length; i++) {
      let cx, cy;
      if (horizontal) {
        cx = sx + i;
        cy = sy;
      } else {
        cx = sx;
        cy = sy + i;
      }
      ships[cx * rows + cy] = 1;
    }

    placed++;
  }
}
