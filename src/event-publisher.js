import { Subject } from "rxjs";

export const EventPubliser = (function() {
  const gameover = new Subject();
  const gameover$ = gameover.asObservable();

  function emitGameover() {
    gameover.next();
  }

  return { emitGameover, gameover$ }
})();