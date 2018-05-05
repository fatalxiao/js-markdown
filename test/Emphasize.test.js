'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Emphasize Test', () => {

    it('weak', () => {

        const md = 'aaa*Weak Emphasize*bbb   *Weak Emphasize*   ccc',
            result = '<p>aaa<em>Emphasize</em>bbb   <em>Emphasize</em>   ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('strong', () => {

        const md = 'aaa**Strong Emphasize**bbb   **Strong Emphasize**   ccc',
            result = '<p>aaa<strong>Strong</strong>bbb   <strong>Strong</strong>   ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('weak and strong', () => {

        const md = 'aaa *Weak Emphasize* bbb ***Weak and Strong Emphasize*** ccc',
            result = '<p>aaa <em>Emphasize</em> bbb <strong><em>Emphasize and Strong</em></strong> ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with escape character', () => {

        const md = '**\*Strong**',
            result = '<p>*<strong>Strong</strong></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});