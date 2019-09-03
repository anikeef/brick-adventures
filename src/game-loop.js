import { config } from "./config";

export function GameLoop(renderer, frameActionsBag) {
  let animationFrameId = null;
  let isStopped = true;

  function start() {
    isStopped = false;
    let lastFrameTime = performance.now();
    let dt = 0;
    renderer.initialize();
    animationFrameId = requestAnimationFrame(function animate(timestamp) {
      if (isStopped) return;
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
      isStopped = true;
      cancelAnimationFrame(animationFrameId);
    }
  }

  return { start, stop };
}
