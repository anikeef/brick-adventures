"use strict";
import {Brick} from "./brick.js";
import {Block} from "./block.js";

function GameGUI() {
  const container = document.querySelector(".content");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const brickObj = Brick(0, 0, 50, 50);
  const brick = document.createElement("div");
  brick.classList.add("brick");
  brick.style.width = brickObj.width + "px";
  brick.style.height = brickObj.height + "px";
  container.appendChild(brick);

  const blockObj = Block(250, 0, 100, 50);
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.width = blockObj.width + "px";
  block.style.height = blockObj.height + "px";
  block.style.left = blockObj.x + "px";
  block.style.bottom = blockObj.y + "px";
  container.appendChild(block);

  render();
  container.addEventListener("click", jump);

  function jump(e) {
    if (brickObj.isJumping) return;
    brickObj.isJumping = true;
    const x = brickObj.getXofTime(brickObj.x, getXspeed(e));
    const y = brickObj.getYofTime(brickObj.y, getYspeed(e));
    let start = performance.now();
    requestAnimationFrame(function animate() {
      let time = performance.now() - start;
      brickObj.x = x(time);
      brickObj.y = y(time);
      if (brickObj.y < 0) {
        brickObj.isJumping = false;
        brickObj.y = 0;
      } else if (isBrickOnBlock()) {
        brickObj.isJumping = false;
        brickObj.y = blockObj.y + blockObj.height;
      } else {
        requestAnimationFrame(animate);
      }
      render();
    })
  }

  function render() {
    if (isBrickOnBlock()) console.log(isBrickOnBlock());
    brick.style.left = brickObj.x + "px";
    brick.style.bottom = brickObj.y + "px";
  }

  function isBrickOnBlock() {
    return brickObj.x < (blockObj.x + blockObj.width) &&
    brickObj.x > (blockObj.x - brickObj.width) &&
    brickObj.y < (blockObj.y + blockObj.height);
  }

  function getXspeed(e) {
    return (e.pageX - brickObj.x) * 3;
  }

  function getYspeed(e) {
    return (containerHeight - e.pageY - brickObj.y) * 3;
  }
};

GameGUI();
