/* eslint-disable no-param-reassign */
// 加速运动 初始位置，需要移动的距离
function moveTo(start, disc, dom, prop) {
  let movedisc = 0; // 当前移动的距离
  let speed = 5; // 移动速度
  const u = 1.1; // 加速度
  if (disc < 0) {
    speed *= -1;
  }
  const timer = setInterval(() => {
    speed *= u;
    movedisc += speed;
    dom[prop] = start + movedisc;
    if (Math.abs(movedisc) > Math.abs(disc)) {
      dom[prop] = start + disc;
      clearInterval(timer);
    }
  }, 10);
}

export default moveTo;
