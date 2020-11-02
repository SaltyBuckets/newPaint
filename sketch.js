// @ts-nocheck
let drawing = [];

let isDrawing = false;
let currentTool = 'brush';
let lastTool = 'brush';
let lockedPt = new p5.Vector(-1, 0);

let temp = [];
let condition = true;
let typing = false;

let backgroundColor = 150;
let brushColor = '#ed225d';
let brushSize;

let colorPicker;
let floatImg;

let currentPath = [];
let currentSquare;
let currentCircle;
let currentArrow;
let currentArray;
let currentText;
let currentLine;

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
  windowResized();
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
        y: mouseY, //get brush strokes
        color: brushColor,
        size: brushSize,
      };
      currentPath.push(point);
    } else if (currentTool == 'eraser') {
      console.log('eraser');
      brushColor = backgroundColor;
      let point = {
        //get eraser strokes
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
    } else if (currentTool == 'arrow') {
      console.log('arrow');
    } else if (currentTool == 'array') {
      console.log('array');
    } else if (currentTool == 'line') {
      console.log('line');
    }
  }

  showAll();
  // showSquares();
  // showCircles();
  // showArrows();
  // showArrays();
  // showLines();
  // showTexts();
  // noFill();
  // for (let i = 0; i < drawing.length; i++) {
  //   let path = drawing[i];
  //   beginShape();

  //   for (let j = 0; j < path.length; j++) {
  //     //draw brush strokes
  //     curveVertex(path[j].x, path[j].y);
  //     stroke(path[j].color);
  //     strokeWeight(path[j].size);
  //   }
  //   endShape();
  // }
  noFill();
  strokeWeight(2);
  stroke('#ccc'); //draw brush size indicator
  circle(mouseX, mouseY, brushSize);
}
function showAll() {
  for (let i = 0; i < drawing.length; i++) {
    const item = drawing[i];
    if (item instanceof Square) {
      item.update();
      item.show();
      if (currentSquare) {
        if (currentTool == 'square') {
          currentSquare.lx = mouseX;
          currentSquare.ly = mouseY;
          currentSquare.update();
          currentSquare.show();
        }
      }
    } else if (item instanceof Circle) {
      item.update();
      item.show();
      if (currentCircle) {
        if (currentCircle.diameter > 3) {
          currentCircle.update();
          currentCircle.show();
        }
      }
    } else if (item instanceof Arrow) {
      item.update();
      item.show();
      if (currentArrow) {
        if (currentTool == 'arrow') {
          currentArrow.lx = mouseX;
          currentArrow.ly = mouseY;
          currentArrow.update();
          currentArrow.show();
        }
      }
    } else if (item instanceof Line) {
      item.update();
      item.show();
      if (currentLine) {
        if (currentTool == 'line') {
          currentLine.lx = mouseX;
          currentLine.ly = mouseY;
          currentLine.update();
          currentLine.show();
        }
      }
    } else if (item instanceof Paragraph) {
        item.update();
        item.show();
      if (currentText) {
        if (currentTool == 'text') {
          currentText.update();
          currentText.show('|');
        }
      }
    }else if (item instanceof ArrayModule) {
          item.update();
          item.show();
        
        if (currentArray) {
          if (currentTool == 'array') {
            if (Math.abs(lockedPt.x - currentArray.lx) < 100) {
              currentArray.lx = mouseX;
              condition = true;
              currentArray.update();
              currentArray.show();
            } else {
              endPath();
              condition = false;
              startPath();
            }
          }
        }
    } else {
         beginShape();
         for (let j = 0; j < item.length; j++) {
           //draw brush strokes
          noFill();
           curveVertex(item[j].x, item[j].y);
           stroke(item[j].color);
           strokeWeight(item[j].size);
         }
         endShape();
    }
  }
}


function startPath() {
  isDrawing = true;
  lockedPt.x = mouseX;
  lockedPt.y = mouseY;

  temp.push(lockedPt.y);

  currentSquare = new Square(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentCircle = new Circle(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentArrow = new Arrow(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentArray = new ArrayModule(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentText = new Paragraph(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentLine = new Line(lockedPt.x, lockedPt.y, brushColor, brushSize);
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
  if (currentTool == 'arrow') {
    if (currentArrow) {
      drawing.push(currentArrow);
    }
  }

  if (currentTool == 'square') {
    if (currentSquare) {
      drawing.push(currentSquare);
    }
  }

  if (currentTool == 'array') {
    if (currentArray) {
      drawing.push(currentArray);
    }
  }

  if (currentTool == 'line') {
    if (currentLine) {
      drawing.push(currentLine);
    }
  }

  if (currentCircle)
    if (currentCircle.diameter > 3) {
      drawing.push(currentCircle);
    }

  if (currentTool == 'text') {
    if (currentText) {
      drawing.push(currentText);
    }
  }
  lastTool = currentTool;
  currentSquare = null;
  currentArray = null;
  currentArrow = null;
  currentLine = null;
}

function clearDrawing() {
  drawing = [];
  currentPath = [];
  saved = [];
  squares = [];
  circles = [];
  arrows = [];
  texts = [];
  arrayModules = [];
  lines = [];
}

function keyPressed() {
  if (keyCode == 8) {
    currentText.text = currentText.text.slice(0, -1);
  } else if (keyCode == 13) {
    currentText.text += '\n';
  } else if (key.length == 1) {
    currentText.text += key;
  }

  return false;
}
function undo() {
  let temp;
  if (lastTool == 'brush') temp = drawing.pop();
  else if (lastTool == 'eraser') temp = drawing.pop();
  else if (lastTool == 'square') temp = squares.pop();
  else if (lastTool == 'circle') temp = circles.pop();
  else if (lastTool == 'arrow') temp = arrows.pop();
  else if (lastTool == 'array') temp = arrayModules.pop();
  else if (lastTool == 'line') temp = lines.pop();
  if (temp !== undefined) saved.push(temp);
}
function redo() {
  let temp = saved.pop();

  if (temp !== undefined) drawing.push(temp);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
function saveImage() {
  let name = prompt('Please enter file name', '');
  if (name != null) {
    saveCanvas(name, 'jpg');
  }
}
function mouseReleased() {
  temp = [];
  condition = true;
  // console.log("mouse released");
}
