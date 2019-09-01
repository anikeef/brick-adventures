import { Renderer } from './renderer';
import { GameLoop } from './game-loop';
import { Game } from './game';
import { Brick } from './brick';

const game = Game({
  brick: Brick(0, 0, 50, 50)
});
const renderer = Renderer(game);
const gameLoop = GameLoop(renderer, game);

gameLoop.start();
// setTimeout(() => {
//   gameLoop.stop();
// }, 2000);