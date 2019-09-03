import { Renderer } from './renderer';
import { GameLoop } from './game-loop';
import { Game } from './game';
import { FrameActionsBag } from './frame-actions-bag';
import { EventPublisher } from './event-publisher';
import { first } from 'rxjs/operators';

EventPublisher.play$.subscribe(play)

function play() {
  const frameActionsBag = FrameActionsBag();
  const game = Game({
      frameActionsBag: frameActionsBag,
      eventPublisher: EventPublisher
  });
  const renderer = Renderer(game);
  const gameLoop = GameLoop(renderer, frameActionsBag);

  gameLoop.start();
  EventPublisher.gameover$.pipe(first()).subscribe(
    () => {
      gameLoop.stop();
      renderer.gameover();
    }
  )
}