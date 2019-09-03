import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { config } from './config';
import { EventPublisher } from './event-publisher';

export function Renderer(game) {
  const container = document.querySelector('.gamebox');
  const containerHeight = container.offsetHeight;

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  ctx.transform(1, 0, 0, -1, 0, canvas.height);

  const home = {
    element: document.querySelector('.home'),
    show: function() {
      this.element.classList.add('home-active')
    },
    hide: function() {
      this.element.classList.remove('home-active');
    },
    score: {
      element: document.querySelector('.home-score')
    },
    message: {
      element: document.querySelector('.home-message')
    },
    record: {
      element: document.querySelector('.home-record')
    }
  }
  const score = document.querySelector('.game-score');

  const jumpTrigger$ = fromEvent(container, 'click')
    .pipe(
      filter(() => game.canJump),
      map((event) => {
        return {
          vx: (event.pageX - getCenteredPosition(game.brick.x + game.brick.width / 2)) * 3,
          vy: (containerHeight - event.pageY - game.brick.y) * 3
        }
      })
    );

  jumpTrigger$.subscribe((event) => {
    game.jump(event);
  })

  function render() {
    score.textContent = game.score
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(getCenteredPosition(game.brick.x), game.brick.y, game.brick.width, game.brick.height);

    ctx.fillStyle = '#777777';
    game.blocks.forEach((block) => {
      ctx.fillRect(getCenteredPosition(block.x), block.y, block.width, block.height);
    })
  }

  function initialize() {
    home.hide();
  }

  function gameover() {
    home.message.element.textContent = 'Game over';
    home.record.element.textContent = `Your record: ${game.record}`;
    home.score.element.textContent = `Current score: ${game.score}`;
    home.show();
  }

  function getCenteredPosition(x) {
    return x + (canvas.width - config.activeWidth) / 2;
  }

  return { render, gameover, initialize };
}