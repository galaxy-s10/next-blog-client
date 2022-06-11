module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['import'],
  rules: {
    /**
     * 0 => off
     * 1 => warn
     * 2 => error
     */
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always', //强制或禁止导入组之间的新行：
        //根据导入路径按字母顺序对每个组内的顺序进行排序
        alphabetize: {
          order: 'asc' /* 按升序排序。选项：['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* 忽略大小写。选项：[true, false] */,
        },
      },
    ],
  },
};
