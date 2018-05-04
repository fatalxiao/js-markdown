'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('BreakRow Test', () => {

    it('default', () => {

        const md = 'line 1  \n'
                + 'line 2  \n'
                + 'line 3\n'
                + 'continou line 3',
            result = '<p>'
                + 'line 1'
                + '<br/>'
                + 'line 2'
                + '<br/>'
                + 'line 3\n'
                + 'continou line 3'
                + '</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});