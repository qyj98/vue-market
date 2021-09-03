import styles from './moveToShopping.module.less';

function moveToShopping(options = {}) {
  const {
    img, imgLeft, imgTop, outerContainer, disY, disX, callback,
  } = options;
  const div = document.createElement('div');
  div.className = `${styles.goodsImg}`;
  div.innerHTML = `<img src="${img}" />`;
  outerContainer.appendChild(div);
  div.style.left = `${imgLeft}px`;
  div.style.top = `${imgTop}px`;
  div.style.zIndex = 10;
  const shopCar = document.getElementById('shop-car');
  // ?向右下飘移消失 setTimeout中是动画后的样式, module.less以及上面是初始样式
  setTimeout(() => {
    div.style.transform = `translate(${disX}px, ${disY}px) scale(0.1)`;
    div.style.opacity = 0;
    shopCar.classList.add('active');
    div.addEventListener('transitionend', () => {
      div.remove();
      callback();
    }, { once: true });
  }, 0);
}

export default moveToShopping;
