import { config } from './config'

export function Game({ brick, blocks = [], frameActionsBag }) {
  function jump(event) {
    this.canJump = false;
    this.brick.vx = event.vx;
    this.brick.vy = event.vy;
    frameActionsBag.add('jump', (() => {
      update(this.brick, config.msPerFrame);
      if (this.brick.y <= 0) {
        this.brick.y = 0;
        this.brick.vx = 0;
        this.brick.vy = 0;
        this.canJump = true;
        frameActionsBag.remove('jump');
      }
    }).bind(this));
  }

  function update(object, dt) {
    object.x += object.vx * msToSeconds(dt);
    object.vy += config.groundAcceleration * msToSeconds(dt);
    object.y += object.vy * msToSeconds(dt);
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return { jump, brick, blocks, canJump: true };
}