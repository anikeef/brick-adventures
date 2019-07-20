"use strict";
import {Brick} from "./brick.js";
import {Block} from "./block.js";

function GameGUI() {
  const container = document.querySelector(".content");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const brickObj = Brick(0, 0, 50, 50);
  const brick = initializeBlock(brickObj, "brick");

  const blockObj = Block(250, 300, 50, 50);
  const block = initializeBlock(blockObj, "block");

  container.addEventListener("click", jump);

  function jump(e) {
    if (brickObj.isJumping) return;
    brickObj.isJumping = true;
    let x = brickObj.getXofTime(brickObj.x, getXspeed(e));
    let y = brickObj.getYofTime(brickObj.y, getYspeed(e));
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
      } else if (isBrickUnderBlock()) {
        brickObj.y = blockObj.y - brickObj.height;
        y = brickObj.getYofTime(brickObj.y, 0);
        requestAnimationFrame(animate);
      } else if (isBrickNearBlock()) {
        x = brickObj.getXofTime(brickObj.x, -getXspeed(e));
        requestAnimationFrame(animate);
      } else {
        requestAnimationFrame(animate);
      }
      render();
    })
  }

  function render() {
    if (isBrickNearBlock()) console.log(isBrickNearBlock());
    brick.style.left = brickObj.x + "px";
    brick.style.bottom = brickObj.y + "px";
  }

  function initializeBlock(blockObj, blockClass) {
    const block = document.createElement("div");
    block.classList.add(blockClass);
    block.style.width = blockObj.width + "px";
    block.style.height = blockObj.height + "px";
    block.style.left = blockObj.x + "px";
    block.style.bottom = blockObj.y + "px";
    container.appendChild(block);
    return block;
  }

  function isBrickOnBlock() {
    return brickObj.x < (blockObj.x + blockObj.width) &&
      brickObj.x > (blockObj.x - brickObj.width) &&
      brickObj.y <= (blockObj.y + blockObj.height) &&
      brickObj.y > (blockObj.y + blockObj.height/3);
  }

  function isBrickUnderBlock() {
    return brickObj.x < (blockObj.x + blockObj.width) &&
      brickObj.x > (blockObj.x - brickObj.width) &&
      (brickObj.y + brickObj.height) >= blockObj.y &&
      (brickObj.y + brickObj.height) < (blockObj.y + blockObj.height/3);
  }

  function isBrickNearBlock() {
    return brickObj.y < (blockObj.y + blockObj.height) &&
      brickObj.y > (blockObj.y - brickObj.height) &&
      ((brickObj.x + brickObj.width) >= blockObj.x &&
       (brickObj.x + brickObj.width) < blockObj.x + blockObj.width/4 ||
       brickObj.x > (blockObj.x + blockObj.width * 3/4) &&
       brickObj.x <= (blockObj.x + blockObj.width));
  }

  function getXspeed(e) {
    return (e.pageX - brickObj.x) * 3;
  }

  function getYspeed(e) {
    return (containerHeight - e.pageY - brickObj.y) * 3;
  }
};

GameGUI();
