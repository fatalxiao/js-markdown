'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Strong Test', () => {

    it('default', () => {

        const md = 'aaa**Strong**bbb   **Strong**   ccc',
            result = '<p>aaa<strong>Strong</strong>bbb   <strong>Strong</strong>   ccc</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

    it('with Emphasize', () => {

        const md = 'aaa **Strong** bbb ***Emphasize and Strong*** ccc',
            result = '<p>aaa <strong>Strong</strong> bbb <strong><em>Emphasize and Strong</em></strong> ccc</p>';

        expect(Markdown.parse(md).html).to.be.equal(result);

    });

});