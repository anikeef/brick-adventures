"use strict"

export function GameLoop(renderer) {
  let animationFrameId = null;

  function start() {
    animationFrameId = requestAnimationFrame(function animate() {
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
