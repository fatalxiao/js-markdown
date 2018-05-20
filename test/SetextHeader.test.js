'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('SetextHeader Test', () => {

    it('level 1', () =>
        expect(Markdown.parse(
            'Header 1\n'
            + '========'
        )).to.be.equal(
            '<h1><a id="Header 1" href="#Header 1"></a>Header 1</h1>'
        )
    );

    it('level 2', () =>
        expect(Markdown.parse(
            'Header 2\n'
            + '--------'
        )).to.be.equal(
            '<h2><a id="Header 2" href="#Header 2"></a>Header 2</h2>'
        )
    );

    it('with paragraph', () =>
        expect(Markdown.parse(
            'Header 2\n'
            + '--------'
            + '\n'
            + 'Here is a paragraph.'
        )).to.be.equal(
            '<h2><a id="Header 2" href="#Header 2"></a>Header 2</h2><p>Here is a paragraph.</p>'
        )
    );

});