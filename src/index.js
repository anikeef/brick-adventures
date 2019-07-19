"use strict";
import {Ball} from "./ball.js";

function GameGUI() {
  const container = document.querySelector(".content");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.width = 50 + "px";
  ball.style.height = 50 + "px";
  ball.style.left = 0;
  ball.style.bottom = 0;
  container.appendChild(ball);

  container.addEventListener("click", jump);

  function jump(e) {
    const x = Ball.getXofTime(parseInt(ball.style.left), getXspeed(e));
    const y = Ball.getYofTime(parseInt(ball.style.bottom), getYspeed(e));
    let start = performance.now();
    requestAnimationFrame(function animate() {
      let time = performance.now() - start;
      // If ball is not underground
      if (parseInt(ball.style.bottom) >= 0) {
        ball.style.left = x(time) + "px";
        ball.style.bottom = y(time) + "px";
        requestAnimationFrame(animate);
      } else {
        ball.style.left = x(time) + "px";
        ball.style.bottom = 0;
      }
    })
  }

  function getXspeed(e) {
    return (e.pageX - parseInt(ball.style.left)) * 3;
  }

  function getYspeed(e) {
    return (containerHeight - e.pageY - parseInt(ball.style.bottom)) * 3;
  }
};

GameGUI();
