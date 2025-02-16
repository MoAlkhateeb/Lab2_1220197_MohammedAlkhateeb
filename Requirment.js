class pt {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid Width and/or Height");
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getHeight() {
    return this.h;
  }

  getWidth() {
    return this.w;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * this.width + 2 * this.height;
  }

  updateHeight(height) {
    if (height && height > 0) {
      this.height = height;
    }
  }

  updateWidth(width) {
    if (width && width > 0) {
      this.width = width;
    }    
  }

  updateStartingPoint(startingPoint) {
    if (startingPoint) {
      this.startingPoint = startingPoint;
    }
  }

  update({ startingPoint, width, height }) {
    this.updateHeight(height);
    this.updateWidth(width);
    this.updateStartingPoint(startingPoint);
  }

  printEndPoints() {
    const topRight = this.startingPoint.x + this.width;
    const bottomLeft = this.startingPoint.y + this.height;

    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
}

function createRectangle(x, y, width, height) {
  const mainPoint = new pt(x, y);
  const rect = new Rectangle(mainPoint, width, height);
  return rect;
}

function createSquare(x, y, length) {
  if (!length || length <= 0) {
    throw Error("Invalid side length.");
  }

  let square = createRectangle(x, y, length, length);
  const squareArea = square.getArea();
  const squarePerimeter = square.getPerimeter();
  console.log("Square Area ", squareArea);
  console.log("Square Perimeter ", squarePerimeter);
  return square
}

const rect = createRectangle(2, 3, 5, 4);
const square = createSquare(1, 2, 5);

console.log(square.getPerimeter());
square.printEndPoints();

rect.update({
  height: 3
});
