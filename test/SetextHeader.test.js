'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('SetextHeader Test', () => {

    it('level 1', () => {

        const md = 'Header 1\n'
                + '========',
            result = '<h1><a id="Header 1" href="#Header 1"></a>Header 1</h1>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('level 2', () => {

        const md = 'Header 2\n'
                + '--------',
            result = '<h2><a id="Header 2" href="#Header 2"></a>Header 2</h2>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with paragraph', () => {

        const md = 'Header 2\n'
                + '--------'
                + '\n'
                + 'Here is a paragraph.',
            result = '<h2><a id="Header 2" href="#Header 2"></a>Header 2</h2><p>Here is a paragraph.</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});