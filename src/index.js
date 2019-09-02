import { Renderer } from './renderer';
import { GameLoop } from './game-loop';
import { Game } from './game';
import { Brick } from './brick';
import { FrameActionsBag } from './frame-actions-bag';
import { Block } from './block';

const frameActionsBag = FrameActionsBag();
const game = Game({
  brick: Brick(0, 0, 50, 50),
  frameActionsBag: frameActionsBag
});
const renderer = Renderer(game);
const gameLoop = GameLoop(renderer, frameActionsBag);

gameLoop.start();
// setTimeout(() => {
//   gameLoop.stop();
// }, 2000);