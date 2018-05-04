'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('MetaData Test', () => {

    it('default', () => {

        const md = 'name:        js-markdown\n'
                + 'author:      falalxiao\n'
                + 'description: A markdown language js compiler.\n'
                + '\n'
                + 'Here is a paragraph.',
            result = '<p>Here is a paragraph.</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});