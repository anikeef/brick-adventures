export const Brick = function(x, y, width, height) {
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

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return {x, y, width, height, getXofTime, getYofTime};
};
