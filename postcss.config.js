console.log(
  '\033[0;37;44m INFO \033[0m',
  '\033[0;;34m ' +
    `读取了: ${__filename.slice(__dirname.length + 1)}` +
    ' \033[0m'
);

module.exports = {
  plugins: [
    'postcss-preset-env',
    // [
    //   'postcss-px-to-viewport',
    //   {
    //     unitToConvert: 'px',
    //     viewportWidth: 360,
    //     unitPrecision: 5,
    //     propList: ['*'],
    //     viewportUnit: 'vw',
    //     fontViewportUnit: 'vw',
    //     selectorBlackList: [],
    //     minPixelValue: 1,
    //     mediaQuery: false,
    //     replace: true,
    //     exclude: undefined,
    //     include: undefined,
    //     landscape: false,
    //     landscapeUnit: 'vw',
    //     landscapeWidth: 568,
    //   },
    // ],
  ],
};
