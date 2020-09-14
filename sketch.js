let drawing = [];
let currentPath = [];
let saved = [];
let squares = [];
let circles = [];
let arrows = [];
let texts = [];

let isDrawing = false;
let currentTool = 'brush';
let lockedPt = new p5.Vector(-1, 0);
let tool;

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
  canvas.mouseOut(endPath);

  // squares.push(new Square(width / 2, height / 2, 50, brushColor));  

  colorPicker = select('#favcolor');

  rectMode(RADIUS);

  slider = createSlider(1, 50, 10);
  slider.style('width', '80px');
  slider.size(200);

  slider.parent('brushSizeDropdown');
  slider.position(0, 0, 'relative');
}


function draw() {
  background(backgroundColor);
  brushColor = colorPicker.value();
  brushSize = slider.value();
  strokeWeight(brushSize);

  if (isDrawing) {
    if (currentTool == 'brush') {
      let point = {
        x: mouseX,
        y: mouseY,
        color: brushColor,
        size: brushSize
      };
      currentPath.push(point);
    } else if (currentTool == 'eraser') {
      console.log('eraser');
      brushColor = backgroundColor;
      let point = {
        x: mouseX,
        y: mouseY,
        color: brushColor,
        size: brushSize

      };
      currentPath.push(point);
    } else if (currentTool == 'square') {
      console.log('square');
      currentSquare.boxSize = dist(lockedPt.x, lockedPt.y, mouseX, mouseY);
    }
  }

  noFill();

  for (let i = 0; i < drawing.length; i++) {
    let path = drawing[i];
    beginShape();

    for (let j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
      stroke(path[j].color);
      strokeWeight(path[j].size)
    }
    endShape();
  }

  for (let i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].show();
  }

  if (currentSquare) {
    if (currentSquare.boxSize > 3) {
      currentSquare.update();
      currentSquare.show();
    }
  }
}

function startPath() {
  isDrawing = true;
  lockedPt.x = mouseX;
  lockedPt.y = mouseY;
  currentSquare = new Square(lockedPt.x, lockedPt.y, 0, brushColor, brushSize);

  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
  if (currentSquare.boxSize > 3) squares.push(currentSquare);
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

function activateTool(tool) {
  currentTool = tool;
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
