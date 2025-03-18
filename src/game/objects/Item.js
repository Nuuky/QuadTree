// import BaseItem from "./BaseItem";
import { Area } from "../engine";
// import { map } from "../utils";

import { random } from "../utils";

// Constants
const MIN = 10;
const MAX = 100;

export default class Item {
  constructor(x, y, id, playerId) {
    const itemVx = Math.random() < 0.5 ? -1 : 1;
    const itemVy = Math.random() < 0.5 ? -1 : 1;

    this.pos = { x, y };
    this.id = id;
    this.vel = {
      x: itemVx * random(MIN, MAX),
      y: itemVy * random(MIN, MAX)
    };
    this.r = 10;
    // Math.round(Math.abs(MAX - (Math.abs(this.vel.x) + Math.abs(this.vel.y)) / 2) / MIN);
    this.nearbyItems = [];
    this.distance = 20;
    this.area = new Area(x, y, this.distance, this.id);
    this.collided = false;

    this.isPlayer = this.id === playerId
  }

  update(game, start) {
    this.checkCollision(game.width, game.height);

    this.pos.x += (this.vel.x / 1000) * game.delta;
    this.pos.y += (this.vel.y / 1000) * game.delta;

    this.area.update(this.pos.x, this.pos.y);

     this.nearbyItems= game.qt.query(this.area, this.id)

    if (this.nearbyItems.length > 0) this.collided = true

    // if (this.id === 0 && game.frameCount%20 === 0) console.log(this.nearbyItems)
    /*
    for (let i = 0; i < this.nearbyItems.length; i++) {
      const pill = this.nearbyItems[i];
      if (pill === this) continue;
      const a = this.pos.x - pill.pos.x;
      const b = this.pos.y - pill.pos.y;
      const d = Math.sqrt(a * a + b * b);
      //const alpha = 0.9 - map(d, 0, dMax, 0, 0.9, true);
      if (d <= this.r + pill.r) {
        this.collided = true;
        return;
      }
    }
    */
  }

  hasChecked = item => {
    return this.nearbyItems.some(it => it === this);
  };

  display(ctx, test) {
    if (this.isPlayer) this.area.display(ctx);
    // Draw Lines

    /*
    this.nearbyItems = this.nearbyItems.filter(item => {
      return !item.hasChecked(this);
    });
    this.nearbyItems.forEach((item, i) => {
      const a = this.pos.x - item.pos.x;
      const b = this.pos.y - item.pos.y;
      const d = Math.sqrt(a * a + b * b);
      const alpha = 0.9 - map(d, 0, this.distance, 0, 0.9, true);
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(item.pos.x, item.pos.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.stroke();
      ctx.closePath();
    });*/
    //if (test && this.id === 0) console.log(this.pos.x);

    ctx.fillStyle = this.collided ? "red" : "white";
    // Draw Item
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    this.nearbyItems = [];
    this.collided = false;
  }

  checkCollision(width, height) {
    if (this.pos.x - this.r <= 0 && this.vel.x < 0) this.vel.x = -this.vel.x;
    else if (this.pos.x + this.r >= width && this.vel.x > 0)
      this.vel.x = -this.vel.x;

    if (this.pos.y - this.r <= 0 && this.vel.y < 0) this.vel.y = -this.vel.y;
    else if (this.pos.y + this.r >= height && this.vel.y > 0)
      this.vel.y = -this.vel.y;
  }
}
