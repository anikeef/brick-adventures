import { Renderer } from './renderer';
import { GameLoop } from './game-loop';
import { Game } from './game';
import { Brick } from './brick';

const game = Game({
  brick: Brick(0, 0, 50, 50)
});
console.log(game.brick)
const renderer = Renderer(game);
const gameLoop = GameLoop(renderer);

gameLoop.start();
// setTimeout(() => {
//   gameLoop.stop();
// }, 2000);