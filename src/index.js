"use strict";
import {Brick} from "./brick.js";

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
  render();

  container.addEventListener("click", jump);

  function jump(e) {
    const x = brickObj.getXofTime(brickObj.x, getXspeed(e));
    const y = brickObj.getYofTime(brickObj.y, getYspeed(e));
    let start = performance.now();
    requestAnimationFrame(function animate() {
      let time = performance.now() - start;
      if (brickObj.y >= 0) {
        brickObj.x = x(time);
        brickObj.y = y(time);
        requestAnimationFrame(animate);
      } else {
        brickObj.x = x(time);
        brickObj.y = 0;
      }
      render();
    })
  }

  function render() {
    brick.style.left = brickObj.x + "px";
    brick.style.bottom = brickObj.y + "px";
  }

  function getXspeed(e) {
    return (e.pageX - parseInt(brick.style.left)) * 3;
  }

  function getYspeed(e) {
    return (containerHeight - e.pageY - parseInt(brick.style.bottom)) * 3;
  }
};

GameGUI();
