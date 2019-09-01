import { fromEvent, interval } from 'rxjs';
import { takeWhile, finalize } from 'rxjs/operators';
import { Brick } from './brick';
import { config } from './config'

export function Game({ brick, blocks }) {
  let drawFunctions = {};

  function jump(event) {
    this.canJump = false;
    this.brick.vx = event.vx;
    this.brick.vy = event.vy;
    this.drawFunctions.jump = () => {
      update(this.brick, config.msPerFrame);
      if (this.brick.y <= 0) {
        this.brick.y = 0;
        this.brick.vx = 0;
        this.brick.vy = 0;
        this.canJump = true;
        delete this.drawFunctions.jump;
      }
    }
  }

  function update(object, dt) {
    object.x += object.vx * msToSeconds(dt);
    object.vy += config.groundAcceleration * msToSeconds(dt);
    object.y += object.vy * msToSeconds(dt);
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return { jump, brick, canJump: true, drawFunctions };
}