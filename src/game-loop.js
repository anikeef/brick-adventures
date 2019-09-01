"use strict"

import { config } from "./config";

export function GameLoop(renderer, frameActionsBag) {
  let animationFrameId = null;

  function start() {
    let lastFrameTime = performance.now();
    let dt = 0;
    animationFrameId = requestAnimationFrame(function animate(timestamp) {
      dt += timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      while (dt > config.msPerFrame) {
        dt -= config.msPerFrame;
        frameActionsBag.executeAll();
      }
      renderer.render();
      animationFrameId = requestAnimationFrame(animate);
    })
  }

  function stop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  return { start, stop };
}
