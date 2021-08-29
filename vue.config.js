const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5, // ?我写的px相对与这个基值转化成rem
          }),
        ],
      },
    },
  },
};
