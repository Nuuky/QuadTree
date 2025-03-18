import "./styles.css";

import { random } from "./game/utils";
import Game from "./game/Game";
// import createQT from "./game/engine/QuadTree";
import Item from "./game/objects/Item";

const width = window.innerWidth;
const height = window.innerHeight;

const game = new Game(width, height, 25);

const nbPills = 100
let pills = [];
for (let i = 0; i < nbPills; i++) {
  const x = random(0, width);
  const y = random(0, height);
  pills.push(new Item(x, y, i, nbPills-1));
}

game.actors(pills);
game.setup();
game.start();

pills.length = 0;
pills = [];
