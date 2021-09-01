// import styles from './moveToShopping.module.less';

// function moveToShopping(options = {}) {
//   const {
//     img, imgLeft: left, imgTop: top, cContainer: container, discY, callback,
//   } = options;
//   const div = document.createElement('div');
//   div.className = `${styles.goodsImg}`;
//   div.innerHTML = `<img src="${img}" />`;
//   container.appendChild(div);
//   div.style.left = `${left}px`;
//   div.style.top = `${top}px`;
//   // 重新渲染
//   console.log(discY, callback);
//   // 向右下飘移消失
//   div.addEventListener('animationend', () => {
//     console.log('end');
//     div.remove();
//     callback();
//   }, { once: true });
// }

// export default moveToShopping;

import styles from './moveToShopping.module.less';

function moveToShopping(options = {}) {
  const {
    img, imgLeft: left, imgTop: top, cContainer: container, discY, callback,
  } = options;
  const div = document.createElement('div');
  div.className = `${styles.goodsImg}`;
  div.innerHTML = `<img src="${img}" />`;
  container.appendChild(div);
  div.style.left = `${left}px`;
  div.style.top = `${top}px`;
  console.log(discY, top);
  // 向右下飘移消失
  setTimeout(() => {
    div.style.transform = `translate(250px, ${discY}px) scale(0.1)`;
    div.style.opacity = 0;
    div.addEventListener('transitionend', () => {
      div.remove();
      callback();
    }, { once: true });
  }, 50);
}

export default moveToShopping;
