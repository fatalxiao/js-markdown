'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('BlockCode Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '```\n'
            + 'here\n'
            + 'is\n'
            + 'the\n'
            + 'code\n'
            + '```'
        )).to.be.equal(
            '<pre><code>here\nis\nthe\ncode</code></pre>'
        )
    );

    it('with language', () =>
        expect(Markdown.parse(
            '```js\n'
            + 'here\n'
            + 'is\n'
            + 'the\n'
            + 'code\n'
            + '```'
        )).to.be.equal(
            '<pre><code lang="js">here\nis\nthe\ncode</code></pre>'
        )
    );

    it('meet InlineCode', () =>
        expect(Markdown.parse(
            '```js```\n'
            + 'here\n'
            + 'is\n'
            + 'the\n'
            + 'code\n'
            + '```'
        )).to.be.equal(
            '<p><code>js</code>\nhere\nis\nthe\ncode</p><pre><code></code></pre>'
        )
    );

});