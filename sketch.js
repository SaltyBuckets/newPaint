let drawing = [];
let currentPath = [];
let saved = [];
let squares = [];
let circles = [];
let arrows = [];
let texts = [];

let isDrawing = false;

let backgroundColor = 150;
let brushColor = '#ed225d';
let tool;
let colorPicker;
let eraserActive = false;
let slider;
let brushSize;

function setup() {
  let canvas = createCanvas(windowWidth - 32, windowHeight);
  canvas.parent('#canvasContainer');
  background(0);

  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);

  squares.push(new Square(width / 2, height / 2, 50,brushColor));

  colorPicker = select('#favcolor');

  rectMode(RADIUS);

  slider = createSlider(1, 50, 10);
  slider.style('width', '80px');
  slider.size(200);


  slider.parent("brushSizeDropdown");
  slider.position(0,0,"relative");  
  
}


function draw() {
  background(backgroundColor);
  brushSize = slider.value();
  strokeWeight(brushSize);
  activateTool(tool);


  if (isDrawing) {
    let point = {
      x: mouseX,
      y: mouseY,
      color: brushColor,
    };
    currentPath.push(point);
  }

  noFill();

  for (let i = 0; i < drawing.length; i++) {
    let path = drawing[i];
    beginShape();

    for (let j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
      stroke(path[j].color);
    }
    endShape();
  }

  for (let i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].show();
  }
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function clearDrawing() {
  drawing = [];
}

function undo() {
  let savedPath = drawing.pop();
  if (savedPath !== undefined) saved.push(savedPath);
}
function redo() {
  let savedPath = saved.pop();
  if (savedPath !== undefined) drawing.push(savedPath);
}

function mousePressed() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].overBox) {
      squares[i].locked = true;
      fill(255, 255, 255);
    } else {
      squares[i].locked = false;
    }
    squares[i].xOffset = mouseX - squares[i].bx;
    squares[i].yOffset = mouseY - squares[i].by;
  }
}

function mouseDragged() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].locked) {
      squares[i].bx = mouseX - squares[i].xOffset;
      squares[i].by = mouseY - squares[i].yOffset;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].locked = false;
  }
}

function saveImage() {
  var name = prompt("File Name:", "C Class");
  if(name != null)
   saveCanvas(name, "jpg");
 }


 function activateTool(tool){

  if(tool=='brush'){
    brushColor = colorPicker.value();
    eraserActive=false;
    
  }
 else if(tool=='eraser'){
   brushColor = backgroundColor;
    eraserActive=true;
    
  }
}
