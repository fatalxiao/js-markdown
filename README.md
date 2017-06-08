# JS-MarkDown

[![NPM Version][npm-image]][npm-url]
[![License][license-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/js-markdown.svg
[npm-url]: https://npmjs.org/package/js-markdown
[license-image]: https://img.shields.io/npm/l/js-markdown.svg

A markdown language js compiler.

## Installation

**NPM**

```bash
$ npm install js-markdown --save
```

## Usage

```js
import Markdown from 'js-markdown';

let data = ' ... ',
    html = Markdown.parse(data);
```

## Examples

Examples can be found in the
[examples folder](https://github.com/fatalxiao/js-markdown/tree/master/examples).

**Run Demo**

```bash
$ npm run demo
```

## License

This project is licensed under the terms of the
[MIT license](https://github.com/fatalxiao/js-markdown/blob/master/LICENSE)