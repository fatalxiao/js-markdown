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

        const md = 'aaa *Weak Emphasize* bbb ***Strong and Weak Emphasize*** ccc',
            result = '<p>aaa <em>Weak Emphasize</em> bbb <strong><em>Strong and Weak Emphasize</em></strong> ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('3 "*"s', () => {

        const md = '***Strong Emphasize**',
            result = '<p>*<strong>Strong Emphasize</strong></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('4 "*"s', () => {

        const md = '****Strong and Weak Emphasize****',
            result = '<p>*<strong><em>Strong and Weak Emphasize</em></strong>*</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with escape character', () => {

        const md = '**\*Strong Emphasize**',
            result = '<p><strong>*Strong Emphasize</strong></p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('mixing syntax', () => {

        const md = 'aaa **_Strong and Weak Emphasize_** bbb __*Strong and Weak Emphasize*__ ccc',
            result = '<p>aaa <strong><em>Strong and Weak Emphasize</em></strong> bbb <strong><em>Strong and Weak Emphasize</em></strong> ccc</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});