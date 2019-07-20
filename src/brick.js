export const Brick = function(x, y) {
  // let vx = 0;
  // let vy = 0;

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

  // function updateCoords(dt) {
  //   a = -3000;
  //   x += vx * msToSeconds(dt);
  //   y = y + vy * t + a * t**2 / 2;
  // }
  //
  // function setXvelocity(v) {
  //   vx = v;
  // }
  //
  // function setYvelocity(v) {
  //   vy = v;
  // }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return {x, y, getXofTime, getYofTime};
};
