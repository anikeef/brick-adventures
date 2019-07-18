//import Ball from "/ball.js"

(function() {
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
    start = performance.now();
    requestAnimationFrame(function animate() {
      console.log(parseInt(ball.style.left), parseInt(ball.style.bottom));
      time = performance.now() - start;
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
    v = 15;
    a = 0;
    t = msToSeconds(time);
    return v * t + a * t * t / 2;;
  }

  function y(time) {
    v = 20;
    a = -40;
    t = msToSeconds(time);
    return v * t + a * t * t / 2;
  }

  function metersToPx(meters) {
    return meters * pxPerMeter + "px";
  }

  function msToSeconds(ms) {
    return ms / 1000;
  }
})();
