// ref -> https://editor.p5js.org/Kubi/sketches/PZWh7P8h1 by Kubi

import Container from "./Container";

export default class QuadTree {
  constructor(boundary, n, items = []) {
    this._container = boundary;
    this._capacity = n;
    this._items = [];
    this._isDivided = false;

    // console.log("items", items);

    for(let item of items) {
      this._insert(item);
    }
  }

  clear() {
    this._items.length = 0;
    this._items = [];
    this._isDivided = false;

    delete this.topLeft;
    delete this.topRight;
    delete this.botLeft;
    delete this.botRight;
  }

  _subdivide() {
    const { x, y } = this._container;
    const w = this._container.w / 2;
    const h = this._container.h / 2;

    const nw = new Container(x, y, w, h);
    this.topLeft = new QuadTree(nw, this._capacity, [...this._items]);

    const ne = new Container(x + w, y, w, h);
    this.topRight = new QuadTree(ne, this._capacity, [...this._items]);

    const sw = new Container(x, y + h, w, h);
    this.botLeft = new QuadTree(sw, this._capacity, [...this._items]);

    const se = new Container(x + w, y + h, w, h);
    this.botRight = new QuadTree(se, this._capacity, [...this._items]);

    this._items.length = 0;
    this._items = [];
  }

  insert(items) {
    if (items.constructor === Array) {
      for (let item of items) {
        this._insert(item);
      }
    } else {
      this._insert(items);
    }
  }
  _insert(item) {
    // console.log(item);
    if (!this._container.contains(item)) return false;

    if (!this._isDivided) {
      if (this._items.length < this._capacity) {
        this._items.push(item);
        return true;
      }
      this._subdivide();
      this._isDivided = true;
    }

    if (this.topLeft._insert(item)) return true;
    if (this.topRight._insert(item)) return true;
    if (this.botLeft._insert(item)) return true;
    return this.botRight._insert(item);
  }
 
  query(area, id) {
    let found = []
    this._query(area, found, id);
    return found
  }
  
  _query(area, found, id) {
    if (!area.intersects(this._container)) return found;

    if (this._isDivided) {
      this.topLeft._query(area, found, id)
      this.topRight._query(area, found, id)
      this.botLeft._query(area, found, id)
      this.botRight._query(area, found, id)
    }
    else {
      const p = this._items.filter(item => area.contains(item) && item.id !== id);

      Array.prototype.push.apply(found, p);
    }
    
    return found
  }

  display(ctx) {

    if (!this._isDivided) {
      ctx.strokeStyle = "gray";

      ctx.beginPath();
      ctx.rect(
        this._container.x,
        this._container.y,
        this._container.w,
        this._container.h
      );
      ctx.stroke();
      ctx.closePath();
    } else {
      this.topLeft.display(ctx);
      this.topRight.display(ctx);
      this.botLeft.display(ctx);
      this.botRight.display(ctx);
    }

    /*ctx.fillStyle = "white";
    for (let p of this._items) {
      ctx.fillRect(p.x, p.y, 2, 2);
    }*/
  }
}
