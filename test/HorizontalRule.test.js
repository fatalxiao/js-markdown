'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('HorizontalRule Test', () => {

    it('use "*"', () => {
        expect(Markdown.parse('***').html).to.be.equal('<hr/>');
    });

    it('use "*" with spaces', () => {
        expect(Markdown.parse('* * *').html).to.be.equal('<hr/>');
    });

    it('use "*" more than three chars', () => {
        expect(Markdown.parse('*****').html).to.be.equal('<hr/>');
    });

    it('use "-"', () => {
        expect(Markdown.parse('---').html).to.be.equal('<hr/>');
    });

    it('use "-" with spaces', () => {
        expect(Markdown.parse('- - -').html).to.be.equal('<hr/>');
    });

    it('use "-" more than three chars', () => {
        expect(Markdown.parse('---------------------------------------').html).to.be.equal('<hr/>');
    });

});