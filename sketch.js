// @ts-nocheck
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

let backgroundColor = 150;
let brushColor = '#ed225d';

let colorPicker;
let floatImg;

let currentSquare;
let currentCircle;

function setup() {
  let canvas = createCanvas(windowWidth - 32, windowHeight);
  canvas.parent('#canvasContainer');
  background(0);

  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  canvas.mouseOut(endPath);

  colorPicker = select('#favcolor');

  rectMode(RADIUS);

  slider = createSlider(1, 50, 10);
  slider.style('width', '80px');
  slider.size(200);

  slider.parent('brushSizeDropdown');
  slider.position(0, 0, 'relative');

  floatImg = select('#floatImg');

  rectMode(CORNERS);
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
        size: brushSize,
      };
      currentPath.push(point);
    } else if (currentTool == 'eraser') {
      console.log('eraser');
      brushColor = backgroundColor;
      let point = {
        x: mouseX,
        y: mouseY,
        color: brushColor,
        size: brushSize,
      };
      currentPath.push(point);
    } else if (currentTool == 'square') {
      console.log('square');
    } else if (currentTool == 'circle') {
      console.log('circle');
      currentCircle.diameter = dist(lockedPt.x, lockedPt.y, mouseX, mouseY);
    }
  }

  noFill();

  for (let i = 0; i < drawing.length; i++) {
    let path = drawing[i];
    beginShape();

    for (let j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
      stroke(path[j].color);
      strokeWeight(path[j].size);
    }
    endShape();
  }

  for (let i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].show();
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }
  if (currentSquare) {
   if (currentTool=="square"){  currentSquare.lx = mouseX;
      currentSquare.ly = mouseY;
      currentSquare.update();
      currentSquare.show();
  }}

  if (currentCircle) {
    if (currentCircle.diameter > 3) {
      currentCircle.update();
      currentCircle.show();
    }
  }
}

function startPath() {
  isDrawing = true;
  lockedPt.x = mouseX;
  lockedPt.y = mouseY;
  currentSquare = new Square(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentCircle = new Circle(lockedPt.x, lockedPt.y, 0, brushColor, brushSize);
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;

if (currentTool=="square"){
  if (currentSquare) {

    squares.push(currentSquare);
    }
  }
  
  if (currentCircle)
    if (currentCircle.diameter > 3) circles.push(currentCircle);
  
  currentSquare = null;
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
  floatImg.elt.className = '';

  if (tool == 'brush') floatImg.addClass('fa fa-paint-brush');
  else if (tool == 'eraser') floatImg.addClass('fa fa-eraser');
  else if (tool == 'square') floatImg.addClass('fa fa-square-o');
  else if (tool == 'circle') floatImg.addClass('fa fa-circle-o');
  else if (tool == 'arrow') floatImg.addClass('fa fa-arrow-right');
  else if (tool == 'array') floatImg.addClass('fa fa-square-o');
}
