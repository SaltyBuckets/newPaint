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
    let offset = 20;
    strokeWeight(this.stroke);
    line(this.bx, this.by, this.lx, this.ly);
     push() //start new drawing state
    var angle = atan2(this.by - this.ly, this.bx - this.lx); //gets the angle of the line
    translate(this.lx, this.ly); //translates to the destination vertex
    rotate(angle-HALF_PI); //rotates the arrow point
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
    pop();
  }
}


