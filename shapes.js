class Square {
  constructor(x, y, boxSize,color) {
    this.bx = x;
    this.by = y;
    this.color = color;
    this.boxSize = boxSize;
    this.overBox = false;
    this.locked = false;
    this.xOffset = 0.0;
    this.yOffset = 0.0;
  

  }

  update() {
    if (
      mouseX > this.bx - this.boxSize &&
      mouseX < this.bx + this.boxSize &&
      mouseY > this.by - this.boxSize &&
      mouseY < this.by + this.boxSize
    ) {
      this.overBox = true;
      isDrawing = false;
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