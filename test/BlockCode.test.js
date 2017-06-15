'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('BlockCode Test', () => {

    it('BlockCode default', () => {

        const md = '```\n'
            + 'code\n'
            + '```';

        expect(Markdown.parse(md)).to.be.equal('<pre><code >code</code></pre>');

    });

    it('BlockCode with language', () => {

        const md = '```js\n'
            + 'code\n'
            + '```';

        expect(Markdown.parse(md)).to.be.equal('<pre><code >code</code></pre>');

    });

});