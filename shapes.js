class Square {
  constructor(x, y, boxSize,color) {
    this.bx = x;
    this.by = y;
    this.color = color;
    this.boxSize = boxSize;
    this.overBox = false;
    this.locked = true;
    this.xOffset = 0.0;
    this.yOffset = 0.0;
  

  }

  update() {
    if (
      mouseX > this.bx - this.boxSize/2 &&
      mouseX < this.bx + this.boxSize/2&&
      mouseY > this.by - this.boxSize/2&&
      mouseY < this.by + this.boxSize/2
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
    rect(this.bx, this.by, this.boxSize, this.boxSize);
  }
}