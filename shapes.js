class Square {
  constructor(x, y, boxSize, color,stroke, cx, cy) {
    this.bx = x;
    this.by = y;
    this.bcx = cx;
    this.bcy = cy;
    this.boxSize = boxSize;
    this.color = color
    this.stroke = stroke;
    console.log("inside constructor");
    
  }
  
  update() {
    stroke(this.color);
    noFill();
  }
  
  show() {
    strokeWeight(this.stroke);
    rect(this.bx, this.by,this.boxSize, this.bcx, this.bcy);
  }
}


class Circle {
  constructor(x, y, diameter,color,stroke) {
    this.bx = x;
    this.by = y;
    this.diameter = diameter;
    this.color = color;
    this.stroke = stroke;
  }

  update() {
  }

  show() {
    strokeWeight(this.stroke);
    circle(this.bx, this.by, this.diameter);
  }
}