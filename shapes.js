class Square {
  constructor(x, y, boxSize,color,stroke) {
    this.bx = x;
    this.by = y;
    this.boxSize = boxSize;
    this.color = color;
    this.stroke = stroke;
    this.overBox = false;
    this.locked = true;
    this.xOffset = 0.0;
    this.yOffset = 0.0;
  

  }

  update() {
    if (
      mouseX > this.bx - (this.boxSize-this.boxSize/3) &&
      mouseX < this.bx + (this.boxSize-this.boxSize/3) &&
      mouseY > this.by - (this.boxSize-this.boxSize/3) &&
      mouseY < this.by + (this.boxSize-this.boxSize/3)
    ) {
      isDrawing = false;

      this.overBox = true;
      if (!this.locked) {
        stroke(this.color);
        noFill();
      }
    } else {

      stroke(this.color);
      noFill();
      this.overBox = false;
    }
  }

  show() {
    strokeWeight(this.stroke);
    rect(this.bx, this.by, this.boxSize, this.boxSize);
  }
}


class Circle {
  constructor(x, y, diameter,color,stroke) {
    this.bx = x;
    this.by = y;
    this.diameter = diameter;
    this.color = color;
    this.stroke = stroke;
    this.overBox = false;
    this.locked = true;
    this.xOffset = 0.0;
    this.yOffset = 0.0;
  

  }

  update() {
    if (
      mouseX > this.bx - (this.diameter-this.diameter/3) &&
      mouseX < this.bx + (this.diameter-this.diameter/3) &&
      mouseY > this.by - (this.diameter-this.diameter/3) &&
      mouseY < this.by + (this.diameter-this.diameter/3)
    ) {
      isDrawing = false;

      this.overBox = true;
      if (!this.locked) {
        stroke(this.color);
        noFill();
      }
    } else {

      stroke(this.color);
      noFill();
      this.overBox = false;
    }
  }

  show() {
    strokeWeight(this.stroke);
    circle(this.bx, this.by, this.diameter);
  }
}

