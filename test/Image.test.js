'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Image Test', () => {

    it('default', () => {

        const md = '![NPM Version](https://img.shields.io/npm/v/js-markdown.svg)',
            result = '<p>'
                + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
                + '</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with title', () => {

        const md = '![NPM Version](https://img.shields.io/npm/v/js-markdown.svg "NPM Version")',
            result = '<p>'
                + '<img alt="NPM Version" title="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
                + '</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with refrence', () => {

        const md = '![NPM Version][npm-image]\n'
                + '[npm-image]: https://img.shields.io/npm/v/js-markdown.svg',
            result = '<p>'
                + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
                + '</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('nested with Link', () => {

        const md = '[![NPM Version][npm-image]][npm-url]\n'
                + '[npm-image]: https://img.shields.io/npm/v/js-markdown.svg\n'
                + '[npm-url]: https://npmjs.org/package/js-markdown',
            result = '<p>'
                + '<a href="https://npmjs.org/package/js-markdown">'
                + '<img alt="NPM Version" src="https://img.shields.io/npm/v/js-markdown.svg"/>'
                + '</a>'
                + '</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});