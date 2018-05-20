'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Paragraph Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            'Here\n'
            + 'is\n'
            + 'a\n'
            + 'paragraph.'
        )).to.be.equal(
            '<p>Here\nis\na\nparagraph.</p>'
        )
    );

    it('multi lines', () =>
        expect(Markdown.parse(
            'line 1  \n'
            + 'line 2  \n'
            + 'line 3'
        )).to.be.equal(
            '<p>line 1<br/>line 2<br/>line 3</p>'
        )
    );

    it('several paragraph', () =>
        expect(Markdown.parse(
            'Paragraph 1.  \n'
            + '\n'
            + 'Paragraph 2.  \n'
            + '\n'
            + 'Paragraph 3.'
        )).to.be.equal(
            '<p>Paragraph 1.</p><p>Paragraph 2.</p><p>Paragraph 3.</p>'
        )
    );

});