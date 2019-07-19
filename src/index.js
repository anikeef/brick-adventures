"use strict";
import {Brick} from "./brick.js";

function GameGUI() {
  const container = document.querySelector(".content");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const brick = document.createElement("div");
  brick.classList.add("brick");
  brick.style.width = 50 + "px";
  brick.style.height = 50 + "px";
  brick.style.left = 0;
  brick.style.bottom = 0;
  container.appendChild(brick);

  container.addEventListener("click", jump);

  function jump(e) {
    const x = Brick.getXofTime(parseInt(brick.style.left), getXspeed(e));
    const y = Brick.getYofTime(parseInt(brick.style.bottom), getYspeed(e));
    let start = performance.now();
    requestAnimationFrame(function animate() {
      let time = performance.now() - start;
      // If brick is not underground
      if (parseInt(brick.style.bottom) >= 0) {
        brick.style.left = x(time) + "px";
        brick.style.bottom = y(time) + "px";
        requestAnimationFrame(animate);
      } else {
        brick.style.left = x(time) + "px";
        brick.style.bottom = 0;
      }
    })
  }

  function getXspeed(e) {
    return (e.pageX - parseInt(brick.style.left)) * 3;
  }

  function getYspeed(e) {
    return (containerHeight - e.pageY - parseInt(brick.style.bottom)) * 3;
  }
};

GameGUI();
