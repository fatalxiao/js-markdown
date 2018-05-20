'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('InlineCode Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '`Inline Code`'
        )).to.be.equal(
            '<p><code>Inline Code</code></p>'
        )
    );

    it('nested 1', () =>
        expect(Markdown.parse(
            '`` `Inline Code` ``'
        )).to.be.equal(
            '<p><code> `Inline Code` </code></p>'
        )
    );

    it('nested 2', () =>
        expect(Markdown.parse(
            '``` `` `Inline Code` `` ```'
        )).to.be.equal(
            '<p><code> `` `Inline Code` `` </code></p>'
        )
    );

});