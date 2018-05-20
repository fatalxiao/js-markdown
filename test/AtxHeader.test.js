'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('AtxHeader Test', () => {

    it('level 1', () =>
        expect(Markdown.parse(
            '# Header1'
        )).to.be.equal(
            '<h1><a id="Header1" href="#Header1"></a>Header1</h1>'
        )
    );

    it('level 2', () =>
        expect(Markdown.parse(
            '## Header2'
        )).to.be.equal(
            '<h2><a id="Header2" href="#Header2"></a>Header2</h2>'
        )
    );

    it('level 3', () =>
        expect(Markdown.parse(
            '### Header3'
        )).to.be.equal(
            '<h3><a id="Header3" href="#Header3"></a>Header3</h3>'
        )
    );

    it('level 4', () =>
        expect(Markdown.parse(
            '#### Header4'
        )).to.be.equal(
            '<h4><a id="Header4" href="#Header4"></a>Header4</h4>'
        )
    );

    it('level 5', () =>
        expect(Markdown.parse(
            '##### Header5'
        )).to.be.equal(
            '<h5><a id="Header5" href="#Header5"></a>Header5</h5>'
        )
    );

    it('level 6', () =>
        expect(Markdown.parse(
            '###### Header6'
        )).to.be.equal(
            '<h6><a id="Header6" href="#Header6"></a>Header6</h6>'
        )
    );

    it('with no space', () =>
        expect(Markdown.parse(
            '#Header1'
        )).to.be.equal(
            '<h1><a id="Header1" href="#Header1"></a>Header1</h1>'
        )
    );

    it('with spaces', () =>
        expect(Markdown.parse(
            '##         Header2      '
        )).to.be.equal(
            '<h2><a id="Header2" href="#Header2"></a>Header2</h2>'
        )
    );

    it('with closing', () =>
        expect(Markdown.parse(
            '### Header3 ######'
        )).to.be.equal(
            '<h3><a id="Header3" href="#Header3"></a>Header3</h3>'
        )
    );

    it('with Strong', () =>
        expect(Markdown.parse(
            '#### Header4 **Strong**'
        )).to.be.equal(
            '<h4>'
            + '<a id="Header4 <strong>Strong</strong>" href="#Header4 <strong>Strong</strong>"></a>'
            + 'Header4 <strong>Strong</strong>'
            + '</h4>'
        )
    );

    it('with Emphasize', () =>
        expect(Markdown.parse(
            '##### Header5 *Emphasize*'
        )).to.be.equal(
            '<h5>'
            + '<a id="Header5 <em>Emphasize</em>" href="#Header5 <em>Emphasize</em>"></a>'
            + 'Header5 <em>Emphasize</em>'
            + '</h5>'
        )
    );

});