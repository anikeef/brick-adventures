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
    console.log(angle(e));
    const x = Ball.getXofTime(parseInt(ball.style.left), angle(e));
    const y = Ball.getYofTime(parseInt(ball.style.bottom), angle(e));
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

  function angle(e) {
    let x = e.pageX - parseInt(ball.style.left);
    let y = (containerHeight - e.pageY) - parseInt(ball.style.bottom);
    return arcctg(x / y);
  }

  function arcctg(x) {
    return Math.PI / 2 - Math.atan(x);
  }
};

GameGUI();
