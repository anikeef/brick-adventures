"use strict";
import Ball from "./ball.js";

function DOMStuff() {
  const container = document.querySelector(".content");
  const width = container.offsetWidth;

  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.width = 70 + "px";
  ball.style.height = 70 + "px";
  ball.style.left = 0;
  ball.style.bottom = 0;
  container.appendChild(ball);

  ball.addEventListener("click", function() {
    let start = performance.now();
    requestAnimationFrame(function animate() {
      //console.log(parseInt(ball.style.left), parseInt(ball.style.bottom));
      let time = performance.now() - start;
      console.log(time);
      if (parseInt(ball.style.bottom) >= 0) {
        ball.style.left = x(time) + "px";
        ball.style.bottom = y(time) + "px";
        requestAnimationFrame(animate);
      } else {
        ball.style.left = x(time) + "px";
        ball.style.bottom = 0;
      }
    })
  })

  function x(time) {
    const v = 500;
    const a = 0;
    const t = msToSeconds(time);
    return v * t + a * t * t / 2;;
  }

  function y(time) {
    const v = 500;
    const a = -1000;
    const t = msToSeconds(time);
    return v * t + a * t * t / 2;
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }
};

DOMStuff();
