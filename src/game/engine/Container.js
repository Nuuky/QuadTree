export default class Container {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains({ pos }) {
    const { x, y } = pos;
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    );
  }

  intersects(area) {
    if (area.constructor.name === "Boundary") {
      return !(
        area.x > this.x + this.w ||
        area.x + area.w < this.x ||
        area.y > this.y + this.h ||
        area.y + area.h < this.y
      );
    } else {
      const right = this.x + this.w;
      const bottom = this.y + this.h;
      let testX = area.x;
      let testY = area.y;
      if (area.x < this.x) testX = this.x;
      // left edge
      else if (area.x > right) testX = right; // right edge
      if (area.y < this.y) testY = this.y;
      // top edge
      else if (area.y > bottom) testY = bottom; // bottom edge

      let distX = area.x - testX;
      let distY = area.y - testY;
      let dist = Math.sqrt(distX * distX + distY * distY);

      if (dist <= area.r) {
        return true;
      }
      return false;
    }
  }
}
