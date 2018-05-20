'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Image Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '![NPM Version](https://img.shields.io/npm/v/js-markdown.svg)'
        )).to.be.equal(
            '<p>'
            + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
            + '</p>'
        )
    );

    it('with title', () =>
        expect(Markdown.parse(
            '![NPM Version](https://img.shields.io/npm/v/js-markdown.svg "NPM Version")'
        )).to.be.equal(
            '<p>'
            + '<img alt="NPM Version" title="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
            + '</p>'
        )
    );

    it('with refrence', () =>
        expect(Markdown.parse(
            '![NPM Version][npm-image]\n'
            + '[npm-image]: https://img.shields.io/npm/v/js-markdown.svg'
        )).to.be.equal(
            '<p>'
            + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
            + '</p>'
        )
    );

    it('nested with Link', () =>
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