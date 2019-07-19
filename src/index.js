"use strict";
import Ball from "./ball.js";

function DOMStuff() {
  const container = document.querySelector(".content");
  const width = container.offsetWidth;
  const pxPerMeter = width / 20;

  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.width = metersToPx(1);
  ball.style.height = metersToPx(1);
  ball.style.left = 0;
  ball.style.bottom = 0;
  container.appendChild(ball);

  ball.addEventListener("click", function() {
    let start = performance.now();
    requestAnimationFrame(function animate() {
      console.log(parseInt(ball.style.left), parseInt(ball.style.bottom));
      let time = performance.now() - start;
      if (parseInt(ball.style.bottom) >= 0) {
        ball.style.left = metersToPx(x(time));
        ball.style.bottom = metersToPx(y(time));
        requestAnimationFrame(animate);
      } else {
        ball.style.left = metersToPx(x(time));
        ball.style.bottom = 0;
      }
    })
  })

  function x(time) {
    const v = 15;
    const a = 0;
    const t = msToSeconds(time);
    return v * t + a * t * t / 2;;
  }

  function y(time) {
    const v = 20;
    const a = -40;
    const t = msToSeconds(time);
    return v * t + a * t * t / 2;
  }

  function metersToPx(meters) {
    return meters * pxPerMeter + "px";
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }
};

DOMStuff();
