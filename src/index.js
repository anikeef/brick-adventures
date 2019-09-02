import { Renderer } from './renderer';
import { GameLoop } from './game-loop';
import { Game } from './game';
import { Brick } from './brick';
import { FrameActionsBag } from './frame-actions-bag';
import { Block } from './block';
import { EventPubliser } from './event-publisher';

const frameActionsBag = FrameActionsBag();
const game = Game({
  frameActionsBag: frameActionsBag,
  eventPublisher: EventPubliser
});
const renderer = Renderer(game);
const gameLoop = GameLoop(renderer, frameActionsBag);

gameLoop.start();
EventPubliser.gameover$.subscribe(
  () => {
    gameLoop.stop();
  }
)