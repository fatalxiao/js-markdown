'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Emphasize Test', () => {

    it('weak', () => {

        const md = 'aaa*Weak Emphasize*bbb   *Weak Emphasize*   ccc',
            result = '<p>aaa<em>Weak Emphasize</em>bbb   <em>Weak Emphasize</em>   ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('strong', () => {

        const md = 'aaa**Strong Emphasize**bbb   **Strong Emphasize**   ccc',
            result = '<p>aaa<strong>Strong Emphasize</strong>bbb   <strong>Strong Emphasize</strong>   ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('weak and strong', () => {

        const md = 'aaa *Weak Emphasize* bbb ***Weak and Strong Emphasize*** ccc',
            result = '<p>aaa <em>Weak Emphasize</em> bbb <strong><em>Weak and Strong Emphasize</em></strong> ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with escape character', () => {

        const md = '**\*Strong**',
            result = '<p>*<strong>Strong</strong></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});