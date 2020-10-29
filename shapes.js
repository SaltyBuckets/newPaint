// @ts-nocheck
class Square {
  constructor(x, y, color, stroke) {
    this.bx = x;
    this.by = y;
    this.lx = x;
    this.ly = y;
    this.color = color;
    this.stroke = stroke;
  }

  update() {
    stroke(this.color);
    noFill();
  }
  
  show() {
    strokeWeight(this.stroke);
    rect(this.bx, this.by, this.lx, this.ly);
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
