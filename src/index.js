import { Renderer } from './renderer';
import { GameLoop } from './game-loop';

const game = GameLoop(Renderer());
game.start();
setTimeout(() => {
  game.stop();
}, 2000);