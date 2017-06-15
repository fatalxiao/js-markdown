'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('BlockCode Test', () => {

    it('default', () => {

        const md = '```\n'
            + 'here\n'
            + 'is\n'
            + 'the\n'
            + 'code\n'
            + '```';

        expect(Markdown.parse(md)).to.be.equal('<pre><code >here\nis\nthe\ncode</code></pre>');

    });

    it('with language', () => {

        const md = '```js\n'
            + 'here\n'
            + 'is\n'
            + 'the\n'
            + 'code\n'
            + '```';

        expect(Markdown.parse(md)).to.be.equal('<pre><code lang="js">here\nis\nthe\ncode</code></pre>');

    });

    it('meet InlineCode', () => {

        const md = '```js```\n'
            + 'here\n'
            + 'is\n'
            + 'the\n'
            + 'code\n'
            + '```';

        expect(Markdown.parse(md)).to.be.equal('<p><code>js</code>\nhere\nis\nthe\ncode</p><pre><code ></code></pre>');

    });

});