import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export function Renderer(game) {
  const container = document.querySelector('.gamebox');
  const containerHeight = container.offsetHeight;
  const brick = initializeBrick();
  const jumpTrigger$ = fromEvent(container, 'click')
    .pipe(
      filter(() => game.canJump),
      map((event) => {
        return {
          xSpeed: event.pageX - game.brick.x,
          ySpeed: containerHeight - event.pageY - game.brick.y
        }
      })
    );
  let jumpListener = null;

  jumpTrigger$.subscribe((event) => {
    game.jump(event);
  })

  function initializeBrick() {
    let brick = document.createElement('div');
    brick.classList.add('brick');
    brick.style.width = game.brick.width + 'px';
    brick.style.height = game.brick.height + 'px';
    brick.style.bottom = game.brick.y + 'px';
    brick.style.left = game.brick.x + 'px';
    container.appendChild(brick);
    return brick;
  }

  function render() {
    brick.style.bottom = game.brick.y + 'px';
    brick.style.left = game.brick.x + 'px';
  }

  return { render };
}