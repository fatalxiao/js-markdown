'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('AtxHeader Test', () => {

    it('AtxHeader level 1', () => {
        expect(Markdown.parse('# Header1')).to.be.equal('<h1>Header1</h1>');
    });

    it('AtxHeader level 2', () => {
        expect(Markdown.parse('##Header2')).to.be.equal('<h2>Header2</h2>');
    });

    it('AtxHeader level 3', () => {
        expect(Markdown.parse('###      Header3')).to.be.equal('<h3>Header3</h3>');
    });

    it('AtxHeader level 4', () => {
        expect(Markdown.parse('#### Header4     ')).to.be.equal('<h4>Header4</h4>');
    });

    it('AtxHeader level 5', () => {
        expect(Markdown.parse('##### Header5 *Emphasize*')).to.be.equal('<h5>Header5 <em>Emphasize</em></h5>');
    });

    it('AtxHeader level 6', () => {
        expect(Markdown.parse('###### Header6 **Strong**')).to.be.equal('<h6>Header6 <strong>Strong</strong></h6>');
    });

});