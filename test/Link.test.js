'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Link Test', () => {

    it('default', () => {

        const md = '[NPM Version](https://npmjs.org/package/js-markdown)',
            result = '<p>'
                + '<a href="https://npmjs.org/package/js-markdown">'
                + 'NPM Version'
                + '</a>'
                + '</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('with title', () => {

        const md = '[NPM Version](https://npmjs.org/package/js-markdown "NPM Version")',
            result = '<p>'
                + '<a href="https://npmjs.org/package/js-markdown" title="NPM Version">'
                + 'NPM Version'
                + '</a>'
                + '</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('with refrence', () => {

        const md = '[NPM Version][npm-url]\n'
                + '[npm-url]: https://npmjs.org/package/js-markdown',
            result = '<p>'
                + '<a href="https://npmjs.org/package/js-markdown">'
                + 'NPM Version'
                + '</a>'
                + '</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('nested with Image', () => {

        const md = '[![NPM Version][npm-image]][npm-url]\n'
                + '[npm-image]: https://img.shields.io/npm/v/js-markdown.svg\n'
                + '[npm-url]: https://npmjs.org/package/js-markdown',
            result = '<p>'
                + '<a href="https://npmjs.org/package/js-markdown">'
                + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
                + '</a>'
                + '</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

});