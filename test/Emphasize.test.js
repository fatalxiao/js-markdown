'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Emphasize Test', () => {

    it('weak', () =>
        expect(Markdown.parse(
            'aaa*Weak Emphasize*bbb   *Weak Emphasize*   ccc'
        )).to.be.equal(
            '<p>aaa<em>Weak Emphasize</em>bbb   <em>Weak Emphasize</em>   ccc</p>'
        )
    );

    it('strong', () =>
        expect(Markdown.parse(
            'aaa**Strong Emphasize**bbb   **Strong Emphasize**   ccc'
        )).to.be.equal(
            '<p>aaa<strong>Strong Emphasize</strong>bbb   <strong>Strong Emphasize</strong>   ccc</p>'
        )
    );

    it('weak and strong', () =>
        expect(Markdown.parse(
            'aaa *Weak Emphasize* bbb ***Strong and Weak Emphasize*** ccc'
        )).to.be.equal(
            '<p>aaa <em>Weak Emphasize</em> bbb <strong><em>Strong and Weak Emphasize</em></strong> ccc</p>'
        )
    );

    it('3 "*"s', () =>
        expect(Markdown.parse(
            '***Strong Emphasize**'
        )).to.be.equal(
            '<p>*<strong>Strong Emphasize</strong></p>'
        )
    );

    it('4 "*"s', () =>
        expect(Markdown.parse(
            '****Strong and Weak Emphasize****'
        )).to.be.equal(
            '<p>*<strong><em>Strong and Weak Emphasize</em></strong>*</p>'
        )
    );

    it('with escape character', () =>
        expect(Markdown.parse(
            '**\\*Strong Emphasize**'
        )).to.be.equal(
            '<p><strong>*Strong Emphasize</strong></p>'
        )
    );

    it('mixing syntax', () =>
        expect(Markdown.parse(
            'aaa **_Strong and Weak Emphasize_** bbb __*Strong and Weak Emphasize*__ ccc'
        )).to.be.equal(
            '<p>'
            + 'aaa '
            + '<strong><em>Strong and Weak Emphasize</em></strong>'
            + ' bbb '
            + '<strong><em>Strong and Weak Emphasize</em></strong>'
            + ' ccc'
            + '</p>'
        )
    );

});