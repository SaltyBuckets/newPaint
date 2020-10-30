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
    rect(this.bx, this.by, this.lx, this.ly);
  }
}

class Circle {
  constructor(x, y, color, stroke) {
    this.bx = x;
    this.by = y;
    this.diameter = 0;
    this.color = color;
    this.stroke = stroke;
  }

  update() {  stroke(this.color);
  noFill();}

  show() {
    strokeWeight(this.stroke);
    circle(this.bx, this.by, this.diameter);
  }
}

class ArrayModule {
  constructor(x, y, color, stroke) {
    this.bx = x;
    this.by = y;
    this.lx = x;
    this.ly =y;
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
    fill(this.color);
  }
  
  show() {
    let offset = 20;
    strokeWeight(this.stroke);
    line(this.bx, this.by, this.lx, this.ly);
    push() 
    var angle = atan2(this.by - this.ly, this.bx - this.lx); 
    translate(this.lx, this.ly);
    rotate(angle-HALF_PI);
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); 
    pop();
  }
}


