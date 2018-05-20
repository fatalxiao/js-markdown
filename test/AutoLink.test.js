'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('AutoLink Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '<https://github.com/fatalxiao/js-markdown>'
        )).to.be.equal(
            '<p>'
            + '<a href="https://github.com/fatalxiao/js-markdown">'
            + 'https://github.com/fatalxiao/js-markdown'
            + '</a>'
            + '</p>'
        )
    );

    it('invalid url', () =>
        expect(Markdown.parse(
            '<github.com/fatalxiao/js-markdown>'
        )).to.be.equal(
            '<p><github.com/fatalxiao/js-markdown></p>'
        )
    );

});