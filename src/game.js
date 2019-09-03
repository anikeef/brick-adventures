import { config } from './config'
import { Block } from './block';
import { Brick } from './brick';
import { LocalStorage } from './local-storage';
import { EventPublisher } from './event-publisher';

export function Game({ frameActionsBag }) {
  const brick = Brick(0, config.block.height, config.brick.width, config.brick.height);
  const blocks = [Block(0, 0, config.canvas.activeWidth, config.block.height)];
  for (let i = 1; i * config.horizontalDistanceBetweenBlocks < config.canvas.activeHeight; i++) {
    blocks.push(generateBlock());
  }

  function jump(event) {
    this.canJump = false;
    this.brick.vx = event.vx;
    this.brick.vy = event.vy;
    frameActionsBag.add('jump', (() => {
      update(this.brick, config.msPerFrame);
      if (this.currentBlock = getCurrentBlock.call(this)) {
        this.brick.y = this.currentBlock.y + this.currentBlock.height;
        this.brick.vx = 0;
        this.brick.vy = 0;
        this.canJump = true;
        frameActionsBag.remove('jump');
        nextStep.call(this);
      } else if (this.blockAbove = getBlockAbove.call(this)) {
        this.brick.y = this.blockAbove.y - this.brick.height;
        this.brick.vy = 0;
      } else if (this.brick.y + this.brick.height < 0) {
        gameover.call(this);
      }
    }).bind(this));
  }

  function scroll() {
    this.canJump = false;
    this.scrollVelocity = config.scrollVelocity;
    frameActionsBag.add('slide', () => {
      if (this.brick.y <= config.block.height * 1.5) {
        this.scrollVelocity = 0;
        this.canJump = true;
        while (this.blocks[0].y + this.blocks[0].height < 0) {
          this.blocks.shift();
        }
        frameActionsBag.remove('slide');
      }
      [this.brick, ...this.blocks].forEach((block) => {
        block.y -= this.scrollVelocity * msToSeconds(config.msPerFrame);
      })
    });
  }

  function nextStep() {
    while (this.blocks.slice(-1)[0].y < config.canvas.activeHeight) {
      this.blocks.push(generateBlock.call(this));
    }
    for (let i = 0; this.blocks[i].y + this.blocks[i].height < this.brick.y; i++) {
      this.score++;
    }
    scroll.call(this);
  }

  function gameover() {
    frameActionsBag.clear();
    this.isOver = true;
    if (!LocalStorage.getRecord() || LocalStorage.getRecord() < this.score) {
      LocalStorage.setRecord(this.score);
    }
    this.record = Number(LocalStorage.getRecord());
    EventPublisher.emitGameover();
  }

  function update(object, dt) {
    object.x += object.vx * msToSeconds(dt);
    object.vy += config.groundAcceleration * msToSeconds(dt);
    object.y += object.vy * msToSeconds(dt);
  }

  function generateBlock() {
    let lastBlock = (this) ? this.blocks.slice(-1)[0] : blocks.slice(-1)[0];
    return Block(
      getRandomBlockPosition(lastBlock), 
      (lastBlock ? lastBlock.y : 0) + config.horizontalDistanceBetweenBlocks, 
      config.block.width, 
      config.block.height
    );
  }

  function getCurrentBlock() {
    return this.blocks.find((block) => {
      return this.brick.x < (block.x + block.width) &&
      this.brick.x > (block.x - this.brick.width) &&
      this.brick.y <= (block.y + block.height) &&
      this.brick.y > (block.y + block.height/3) &&
      this.brick.vy < 0;
    })
  }

  function getBlockAbove() {
    return this.blocks.find((block) => {
      return this.brick.x < (block.x + block.width) &&
      this.brick.x > (block.x - this.brick.width) &&
      (this.brick.y + this.brick.height) >= block.y &&
      (this.brick.y + this.brick.height) < (block.y + block.height/2) &&
      this.brick.vy > 0;
    })
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  function getRandomBlockPosition(lastBlock) {
    if (!lastBlock || lastBlock.width == config.canvas.activeWidth) {
      return getRandomInt(0, config.canvas.activeWidth);
    }
    let validPositions = [];
    if (lastBlock.x - config.block.width > 0) {
      validPositions.push(getRandomInt(0, lastBlock.x - config.block.width));
    }
    if (lastBlock.x + lastBlock.width < config.canvas.activeWidth) {
      validPositions.push(getRandomInt(lastBlock.x + lastBlock.width, config.canvas.activeWidth));
    }
    return validPositions[getRandomInt(0, validPositions.length)];
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  return {
    jump, 
    brick, 
    blocks, 
    canJump: true,
    score: 0, 
    currentBlock: undefined, 
    blockAbove: undefined,
    scrollVelocity: 0,
    isOver: false,
    record: 0
  };
}