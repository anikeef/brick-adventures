import { config } from './config'
import { Block } from './block';
import { last } from 'rxjs/operators';

export function Game({ brick, blocks = [], frameActionsBag, activeWidth = 720 }) {
  function jump(event) {
    generateBlock.call(this);
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

  function generateBlock() {
    let lastBlock = this.blocks.slice(-1)[0];
    this.blocks.push(
      Block(
        getRandomBlockPosition(lastBlock), 
        (lastBlock ? lastBlock.y : 0) + config.newBlockStep, 
        config.blockWidth, 
        config.blockHeight
      )
    );
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  function getRandomBlockPosition(lastBlock) {
    if (!lastBlock) {
      return getRandomInt(0, activeWidth);
    }
    let validPositions = [];
    if (lastBlock.x - config.blockWidth > 0) {
      validPositions.push(getRandomInt(0, lastBlock.x - config.blockWidth));
    }
    if (lastBlock.x + lastBlock.width < activeWidth) {
      validPositions.push(getRandomInt(lastBlock.x + lastBlock.width, activeWidth));
    }
    return validPositions[getRandomInt(0, validPositions.length)];

  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  return { jump, brick, blocks, canJump: true, activeWidth, score: 0 };
}