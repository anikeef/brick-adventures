import { fromEvent } from 'rxjs';
import { Brick } from './brick';

export function Game({ brick, blocks }) {
  const jumpTrigger$ = fromEvent(document.querySelector('.gamebox'), 'click');
  
}