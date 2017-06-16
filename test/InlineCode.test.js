'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('BreakRow Test', () => {

    it('default', () => {

        const md = '`Inline Code`',
            result = '<p><code>Inline Code</code></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('nested 1', () => {

        const md = '`` `Inline Code` ``',
            result = '<p><code> `Inline Code` </code></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('nested 2', () => {

        const md = '``` `` `Inline Code` `` ```',
            result = '<p><code> `` `Inline Code` `` </code></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});