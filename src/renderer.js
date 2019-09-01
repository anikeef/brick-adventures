import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export function Renderer(game) {
  const container = document.querySelector('.gamebox');
  const containerHeight = container.offsetHeight;
  const brick = initializeElement(game.brick, 'brick');
  const blocks = game.blocks.map((model) => initializeElement(model, 'block'));
  const jumpTrigger$ = fromEvent(container, 'click')
    .pipe(
      filter(() => game.canJump),
      map((event) => {
        return {
          vx: (event.pageX - game.brick.x) * 3,
          vy: (containerHeight - event.pageY - game.brick.y) * 3
        }
      })
    );

  jumpTrigger$.subscribe((event) => {
    game.jump(event);
  })

  function initializeElement(model, type) {
    let element = document.createElement('div');
    element.classList.add(type);
    element.style.width = model.width + 'px';
    element.style.height = model.height + 'px';
    element.style.bottom = model.y + 'px';
    element.style.left = model.x + 'px';
    container.appendChild(element);
    return element;
  }

  function render() {
    brick.style.bottom = game.brick.y + 'px';
    brick.style.left = game.brick.x + 'px';
  }

  return { render };
}