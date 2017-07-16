'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Paragraph Test', () => {

    it('default', () => {

        const md = 'Here\n'
                + 'is\n'
                + 'a\n'
                + 'paragraph.',
            result = '<p>Here\nis\na\nparagraph.</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('multi lines', () => {

        const md = 'line 1  \n'
                + 'line 2  \n'
                + 'line 3',
            result = '<p>line 1<br/>line 2<br/>line 3</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('several paragraph', () => {

        const md = 'Paragraph 1.  \n'
                + '\n'
                + 'Paragraph 2.  \n'
                + '\n'
                + 'Paragraph 3.',
            result = '<p>Paragraph 1.</p><p>Paragraph 2.</p><p>Paragraph 3.</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

});