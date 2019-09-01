export const Brick = function(x, y, width, height) {
  const a = -3000;
  let vy = 0;
  let vx = 0;

  function updateCoords(dt) {
    this.x += this.vx * msToSeconds(dt);
    this.vy += a * msToSeconds(dt);
    this.y += this.vy * msToSeconds(dt);
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }

  return { a, vx, vy, updateCoords, x, y, width, height };
};
