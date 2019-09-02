import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { config } from './config';

export function Renderer(game) {
  const container = document.querySelector('.gamebox');
  const containerHeight = container.offsetHeight;

  const canvas = document.querySelector('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  const ctx = canvas.getContext('2d');
  ctx.transform(1, 0, 0, -1, 0, canvas.height);

  const score = document.querySelector('.game-score');

  const jumpTrigger$ = fromEvent(container, 'click')
    .pipe(
      filter(() => game.canJump),
      map((event) => {
        return {
          vx: (event.pageX - getCenteredPosition(game.brick.x)) * 3,
          vy: (containerHeight - event.pageY - game.brick.y) * 3
        }
      })
    );

  jumpTrigger$.subscribe((event) => {
    game.jump(event);
  })

  function render() {
    if (game.isOver) {
      gameover();
    }
    score.textContent = game.score
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(getCenteredPosition(game.brick.x), game.brick.y, game.brick.width, game.brick.height);

    ctx.fillStyle = '#D2D2D2';
    game.blocks.forEach((block) => {
      ctx.fillRect(getCenteredPosition(block.x), block.y, block.width, block.height);
    })
  }

  function gameover() {
    const gameoverWindow = document.querySelector('.gameover');
    const gameoverScore = document.querySelector('.gameover-score');
    gameoverScore.textContent = game.score;
    gameoverWindow.classList.add('gameover-active');
  }

  function getCenteredPosition(x) {
    return x + (canvas.width - config.activeWidth) / 2;
  }

  return { render };
}