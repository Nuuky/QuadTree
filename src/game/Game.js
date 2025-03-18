import { QuadTree, Container } from "./engine";

export default class Game {
  /* ts-ignore */
  width;
  height;
  #actors = [];
  #capacity;
  #loop;

  diffX = 0;
  diffY = 0;
  isStarted = false;

  constructor(width, height, capacity = 10) {
    this.width = width;
    this.height = height;
    this.#actors = [];
    this.#capacity = capacity;
    this.qt = new QuadTree(
      new Container(0, 0, this.width, this.height),
      this.#capacity
    );
  }

  #self = this;

  #createQT = () => {
    this.qt = null
    this.qt = new QuadTree(
      new Container(0, 0, this.width, this.height),
      this.#capacity
    );
  }

  actors(actorsOrArr) {
    if (actorsOrArr.constructor.name === "Array") {
      for (let actor of actorsOrArr) {
        this.#actors.push(actor);
      }
    } else {
      this.#actors.push(actorsOrArr);
    }
  }

  setup() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "game";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
    document.body.appendChild(this.canvas);
  }

  #insertActors = () => {
    this.qt.insert(this.#actors);
  };

  #fpsInterval;
  #fpsCount = 0;
  #fps = 0;
  #startFpsCount = () => {
    if (this.#fpsInterval) {
      clearInterval(this.#fpsInterval);
    } else {
      this.#fpsInterval = setInterval(() => {
        this.#fps = this.#fpsCount;
        this.#fpsCount = 0;
      }, 1000);
    }
  };

  #displayInfo = () => {
    this.#fpsCount++;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(this.width - 75, 0, 100, 40);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.fillText(this.#fps, this.width - 65, 30);
    this.ctx.closePath();
  };

  #then = 0;
  frameCount = 1
  #frame = () => {
    this.#resize();

    // if (this.frameCount === 200) console.log(this.#actors)

    const now = performance.now();
    this.delta = now - this.#then;
    this.#then = now;

    if (this.delta >= 100) this.delta = 100;

    this.qt.clear();
    this.qt.insert(this.#actors);
    this.#update(!this.isStarted);

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.#display(!this.isStarted);

    this.#displayInfo();
    this.frameCount++
    if(!this.isStarted) this.isStarted = true
    this.#loop = requestAnimationFrame(this.#frame);
  };

  #update = start => {
    this.#actors.forEach((actor, id) => {
      actor.update(this, id, start);
    });
  };

  #display = start => {
    this.qt.display(this.ctx)
    this.#actors.forEach((actor, id) => {
      actor.display(this.ctx, id, start);
    });
  };

  start() {
    this.#loop = requestAnimationFrame(this.#frame);
    this.#startFpsCount();
  }

  stop() {
    cancelAnimationFrame(this.#loop);
  }

  #resize = () => {
    if (
      this.width !== this.canvas.offsetWidth ||
      this.height !== this.canvas.offsetHeight
    ) {
      this.diffX = this.canvas.offsetWidth - this.width;
      this.diffY = this.canvas.offsetHeight - this.height;
      this.width = this.ctx.canvas.width = this.canvas.offsetWidth;
      this.height = this.ctx.canvas.height = this.canvas.offsetHeight;
      this.#createQT()
    }
  };
}
