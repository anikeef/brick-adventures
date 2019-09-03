import { Subject, fromEvent } from "rxjs";

export const EventPublisher = (function() {
  const gameover = new Subject();
  const gameover$ = gameover.asObservable();

  const play$ = fromEvent(document.querySelector('.play-button'), 'click');

  function emitGameover() {
    gameover.next();
  }

  return { emitGameover, gameover$, play$ };
})();