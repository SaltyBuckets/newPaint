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
    rect(this.bx, this.by, this.lx, this.ly,2);
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
  constructor(x, y, color, stroke, initialy, tempcond) {
    this.bx = x;
    this.by = y;
    this.lx = x;
    this.color = color;
    this.stroke = stroke;
    this.iy = initialy;
    this.tc = tempcond;
  }

  update() {
    stroke(this.color);
    noFill();
  }
  
  show() {
    strokeWeight(this.stroke);
    if(this.tc){
    rect(this.bx, this.by, this.lx, this.by+50,2);
    }
    else{
      rect(this.bx, this.iy, this.lx, this.iy+50,2);
    }
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

class Paragraph {
  constructor(x, y, color, size) {
    this.bx = x;
    this.by = y;
    this.color = color;
    this.size = size+20;
    this.text = '';
  }

  update() {
    noStroke();
    fill(this.color);
    textSize(this.size)
  }

  show(caret) {
    if (!caret) caret = ''; 
    {
      noFill();
      stroke(this.color);
      strokeWeight(1);
      drawingContext.setLineDash([6]);
      rect(this.bx - 5, this.by - 30, this.bx + 15*(this.text.length) + 20, this.by + 20);
      fill(this.color);
      noStroke();
      drawingContext.setLineDash([]);
      text(this.text + caret ,this.bx,this.by)
    }
    
  }
}

class Line {
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
    strokeWeight(this.stroke);
    line(this.bx, this.by, this.lx, this.ly);
  }
}