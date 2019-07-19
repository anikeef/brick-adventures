export const Ball = (function(x, y) {

  function getXofTime(x0, angle) {
    const v = 1500; // px/second
    const cosAngle = Math.cos(angle);
    return function(time) {
      const t = msToSeconds(time);
      return x0 + v * cosAngle * t; // px
    }
  }

  function getYofTime(x0, angle) {
    const v = 1500; // px/second
    const a = -3000; // px/second^2
    const sinAngle = Math.sin(angle);
    return function(time) {
      const t = msToSeconds(time);
      return x0 + v * sinAngle * t + a * t**2 / 2; // px
    }
  }

  function xOfTime(time) {
    const v = 2000; // px/second
    const a = 0; // px/second^2
    const t = msToSeconds(time);
    return v * t + a * t * t / 2;; // px
  }

  function yOfTime(time) {
    const v = 500; // px/second
    const a = -1000; // px/second^2
    const t = msToSeconds(time);
    return v * t + a * t * t / 2;
  }

  function yVelocity(time) {

  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return {x, y, getXofTime, getYofTime};
})();
