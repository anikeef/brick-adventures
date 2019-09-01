import { fromEvent, interval } from 'rxjs';
import { takeWhile, finalize } from 'rxjs/operators';
import { Brick } from './brick';
import { config } from './config'

export function Game({ brick, blocks }) {
  function jump(event) {
    this.canJump = false;
    console.log('jump')
    this.brick.vx = event.xSpeed;
    this.brick.vy = event.ySpeed;
    // let time = performance.now();
    // requestAnimationFrame(function animate(timestamp) {
    //   time = performance.now() - time;
    //   console.log(time);
    //   while (time > config.msPerFrame) {
    //     time -= config.msPerFrame;
    //     this.brick.x += this.brick.vx * msToSeconds(config.msPerFrame);
    //     this.brick.vy += this.brick.a * msToSeconds(config.msPerFrame);
    //     this.brick.y += this.brick.vy * msToSeconds(config.msPerFrame);
    //     if (brick.y <= 0) {
    //       this.brick.y = 0;
    //       this.brick.vx = 0;
    //       this.brick.vy = 0;
    //       return;
    //     }
    //   }
    //   requestAnimationFrame(animate).call(this);
    // });
    interval(config.msPerFrame).pipe(
      takeWhile(() => this.brick.y >= 0),
      finalize(() => {
        this.brick.y = 0;
        this.brick.vx = 0;
        this.brick.vy = 0;
        this.canJump = true;
      })
    ).subscribe(
      (time) => {
        this.brick.x += this.brick.vx * msToSeconds(config.msPerFrame);
        this.brick.vy += this.brick.a * msToSeconds(config.msPerFrame);
        this.brick.y += this.brick.vy * msToSeconds(config.msPerFrame);
      }
    );
  }

  function updateCoords(dt) {
    this.brick.x += this.brick.vx * msToSeconds(dt);
    this.brick.vy += this.brick.a * msToSeconds(dt);
    this.brick.y += this.brick.vy * msToSeconds(dt);
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return { jump, brick, canJump: true };
}