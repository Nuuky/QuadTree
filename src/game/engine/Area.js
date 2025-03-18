export default class Area {
  constructor(x, y, r, id) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rPow2 = this.r * this.r;
    this.id = id;
    // console.log("area:", x);
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  _euclideanDistancePow2(point1, point2) {
    return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
  }

  contains(item) {
    return this._euclideanDistancePow2(item.pos, this) <= this.rPow2;
  }

  _contains(item) {
    const distX = item.pos.x - this.x;
    const distY = item.pos.y - this.y;
    return Math.sqrt(distX * distX + distY * distY) <= this.r;
  }

  intersects(area) {
    const right = area.x + area.w;
    const bottom = area.y + area.h;
    let testX = this.x;
    let testY = this.y;
    if (this.x < area.x) testX = area.x;
    // left edge
    else if (this.x > right) testX = right; // right edge
    if (this.y < area.y) testY = area.y;
    // top edge
    else if (this.y > bottom) testY = bottom; // bottom edge

    let distX = this.x - testX;
    let distY = this.y - testY;
    let dist = Math.sqrt(distX * distX + distY * distY);

    if (dist <= this.r) {
      return true;
    }
    return false;
  }

  display(ctx) {
    ctx.strokeStyle = "green";
    ctx.strokeWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}
