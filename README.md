## uxcore-matrix

React matrix

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devdep-image]][devdep-url] 
[![NPM downloads][downloads-image]][npm-url]

[![Sauce Test Status][sauce-image]][sauce-url]

[npm-image]: http://img.shields.io/npm/v/uxcore-matrix.svg?style=flat-square
[npm-url]: http://npmjs.org/package/uxcore-matrix
[travis-image]: https://img.shields.io/travis/uxcore/uxcore-matrix.svg?style=flat-square
[travis-url]: https://travis-ci.org/uxcore/uxcore-matrix
[coveralls-image]: https://img.shields.io/coveralls/uxcore/uxcore-matrix.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/uxcore/uxcore-matrix?branch=master
[dep-image]: http://img.shields.io/david/uxcore/uxcore-matrix.svg?style=flat-square
[dep-url]: https://david-dm.org/uxcore/uxcore-matrix
[devdep-image]: http://img.shields.io/david/dev/uxcore/uxcore-matrix.svg?style=flat-square
[devdep-url]: https://david-dm.org/uxcore/uxcore-matrix#info=devDependencies
[downloads-image]: https://img.shields.io/npm/dm/uxcore-matrix.svg
[sauce-image]: https://saucelabs.com/browser-matrix/uxcore-matrix.svg
[sauce-url]: https://saucelabs.com/u/uxcore-matrix

![demo](https://gw.alicdn.com/tps/TB1Mi1ULXXXXXXQXVXXXXXXXXXX-430-173.png)

### Development

```sh
git clone https://github.com/uxcore/uxcore-matrix
cd uxcore-matrix
npm install
npm run server
```

if you'd like to save your install time，you can use uxcore-tools globally.

```sh
npm install uxcore-tools -g
git clone https://github.com/uxcore/uxcore-matrix
cd uxcore-matrix
npm install
npm run start
```

### Test Case

```sh
npm run test
```

### Coverage

```sh
npm run coverage
```

## Demo

http://uxcore.github.io/components/matrix

## Contribute

Yes please! See the [CONTRIBUTING](https://github.com/uxcore/uxcore/blob/master/CONTRIBUTING.md) for details.



## Props

| Name | Type | Required | Default | Comments |
|---|---|---|---|---|
|prefixCls |string              |no | 'kuma-matrix'      | 类名前缀，不想使用 kuma 主题时使用 |
|className |string              |no | -                  | 额外类名 |
|width     |number/string       |no | -                  | 矩阵宽度，不指定时根据单元格宽度计算得出|
|height    |number/string       |no | -                  | 矩阵高度，不指定时根据单元格高度计算得出|
|cellHeight|number/string/array |no | 40                 | 单元格高度，也可以是一个数组，指定每行单元格的高度，如果数组长度不够，将取第一个行的高度|
|cellWidth |number/string/array |no | 100                | 单元格宽度，也可以是一个数组，指定每列单元格的宽度，如果数组长度不够，将取第一个列的宽度 |
|render    |func(cellData)      |no | (cell) => cell.text| 指定每个单元格的渲染方式|
|data      |object              |yes| {}                 | 数据源，格式见下方 |

## Data structure

```
{
  data: [
    { x: 0, y: 0, row: 2, col: 2, text: '1' },
    { x: 2, y: 0, row: 2, col: 2, text: '2' },
    { x: 4, y: 0, row: 3, col: 1, text: '3' },
    { x: 0, y: 2, row: 1, col: 3, text: '4' },
    { x: 3, y: 2, row: 1, col: 1, text: '5' },
  ],
}
```