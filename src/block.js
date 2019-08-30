export const Block = function(x, y, width, height) {
  let vy = 5;

  function updateCoords() {
    this.y += this.vy * msToSeconds(dt);
  }


  return {x, y, vy, width, height};
}
