// @ts-nocheck
class Square {
  constructor(x, y, color, stroke) {
    this.bx = x;
    this.by = y;
    this.lx = x;
    this.ly = lockedPt.x + 100;
    this.color = color;
    this.stroke = stroke;
  }

  update() {
    stroke(this.color);
    noFill();
  }
  
  show() {
    strokeWeight(this.stroke);
    rect(this.bx, this.by, this.lx, this.by+50);
  }
}

class Circle {
  constructor(x, y, diameter, color, stroke) {
    this.bx = x;
    this.by = y;
    this.diameter = diameter;
    this.color = color;
    this.stroke = stroke;
  }

  update() {}

  show() {
    strokeWeight(this.stroke);
    circle(this.bx, this.by, this.diameter);
  }
}

class Arrow {
  constructor(x, y, color,stroke) {
    this.bx = x;
    this.by = y;
    this.lx = x;
    this.ly = y;
    this.color = color
    this.stroke = stroke;
  }
  
  update() {
    stroke(this.color);
    noFill();
  }
  
  show() {
    strokeWeight(this.stroke);
    line(this.bx, this.by, this.lx, this.ly);
  }
}


