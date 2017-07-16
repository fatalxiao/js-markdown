'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('AutoLink Test', () => {

    it('default', () => {

        const md = '<https://github.com/fatalxiao/js-markdown>',
            result = '<p>'
                + '<a href="https://github.com/fatalxiao/js-markdown">'
                + 'https://github.com/fatalxiao/js-markdown'
                + '</a>'
                + '</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('invalid url', () => {

        const md = '<github.com/fatalxiao/js-markdown>',
            result = '<p><github.com/fatalxiao/js-markdown></p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

});