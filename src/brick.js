export const Brick = function(x, y, width, height) {
  const a = -3000;
  let vy = 0;
  let vx = 0;

  function getXofTime(x0, vx) {
    return function(time) {
      const t = msToSeconds(time);
      return x0 + vx * t; // px
    }
  }

  function getYofTime(x0, vy) {
    const a = -3000; // px/second^2
    return function(time) {
      const t = msToSeconds(time);
      return x0 + vy * t + a * t**2 / 2; // px
    }
  }

  function jump(xVelocity, yVelocity) {
    this.isJumping = true;
    this.vx = xVelocity;
    this.vy = yVelocity;
  }

  function stopJumping(height) {
    this.isJumping = false;
    this.y = height;
  }

  function updateCoords(dt) {
    this.x += this.vx * msToSeconds(dt);
    this.vy += a * msToSeconds(dt);
    this.y += this.vy * msToSeconds(dt);
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return {vx, vy, jump, updateCoords, x, y, width, height, getXofTime, getYofTime, stopJumping, isJumping: false};
};
