'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Link Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '[NPM Version](https://npmjs.org/package/js-markdown)'
        )).to.be.equal(
            '<p>'
            + '<a href="https://npmjs.org/package/js-markdown">'
            + 'NPM Version'
            + '</a>'
            + '</p>'
        )
    );

    it('with title', () =>
        expect(Markdown.parse(
            '[NPM Version](https://npmjs.org/package/js-markdown "NPM Version")'
        )).to.be.equal(
            '<p>'
            + '<a href="https://npmjs.org/package/js-markdown" title="NPM Version">'
            + 'NPM Version'
            + '</a>'
            + '</p>'
        )
    );

    it('with refrence', () =>
        expect(Markdown.parse(
            '[NPM Version][npm-url]\n'
            + '[npm-url]: https://npmjs.org/package/js-markdown'
        )).to.be.equal(
            '<p>'
            + '<a href="https://npmjs.org/package/js-markdown">'
            + 'NPM Version'
            + '</a>'
            + '</p>'
        )
    );

    it('nested with Image', () =>
        expect(Markdown.parse(
            '[![NPM Version][npm-image]][npm-url]\n'
            + '[npm-image]: https://img.shields.io/npm/v/js-markdown.svg\n'
            + '[npm-url]: https://npmjs.org/package/js-markdown'
        )).to.be.equal(
            '<p>'
            + '<a href="https://npmjs.org/package/js-markdown">'
            + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
            + '</a>'
            + '</p>'
        )
    );

});