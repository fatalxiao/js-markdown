'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Emphasize Test', () => {

    it('default', () => {

        const md = 'aaa*Emphasize*bbb   *Emphasize*   ccc',
            result = '<p>aaa<em>Emphasize</em>bbb   <em>Emphasize</em>   ccc</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('with Strong', () => {

        const md = 'aaa *Emphasize* bbb ***Emphasize and Strong*** ccc',
            result = '<p>aaa <em>Emphasize</em> bbb <strong><em>Emphasize and Strong</em></strong> ccc</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

});