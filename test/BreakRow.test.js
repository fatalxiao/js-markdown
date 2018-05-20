'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('BreakRow Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            'line 1  \n'
            + 'line 2  \n'
            + 'line 3\n'
            + 'continou line 3'
        )).to.be.equal(
            '<p>'
            + 'line 1'
            + '<br/>'
            + 'line 2'
            + '<br/>'
            + 'line 3\n'
            + 'continou line 3'
            + '</p>'
        )
    );

});