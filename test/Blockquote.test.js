'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Blockquote Test', () => {

    it('default', () => {

        const md = '> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
                + '> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
                + '> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.\n'
                + '>\n'
                + '> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
                + '> id sem consectetuer libero luctus adipiscing.',
            result = '<blockquote>'
                + '<p>'
                + 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
                + 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
                + 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.'
                + '</p>'
                + '<p>'
                + 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
                + 'id sem consectetuer libero luctus adipiscing.'
                + '</p>'
                + '</blockquote>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('omit ">"', () => {

        const md = '> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
                + '> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
                + '> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.\n'
                + '\n'
                + '> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
                + '> id sem consectetuer libero luctus adipiscing.',
            result = '<blockquote>'
                + '<p>'
                + 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
                + 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
                + 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.'
                + '</p>'
                + '<p>'
                + 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
                + 'id sem consectetuer libero luctus adipiscing.'
                + '</p>'
                + '</blockquote>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('nested', () => {

        const md = '> This is the first level of quoting.\n'
                + '>\n'
                + '> > This is nested blockquote.\n'
                + '>\n'
                + '> Back to the first level.',
            result = '<blockquote>'
                + '<p>'
                + 'This is the first level of quoting.'
                + '</p>'
                + '<blockquote>'
                + '<p>'
                + 'This is nested blockquote.'
                + '</p>'
                + '</blockquote>'
                + '<p>'
                + 'Back to the first level.'
                + '</p>'
                + '</blockquote>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('complicated nested', () => {

        const md = '> ## This is a header.\n'
                + '>\n'
                + '> 1.   This is the first list item.\n'
                + '> 2.   This is the second list item.\n'
                + '>\n'
                + '> Here\'s some example code:\n'
                + '>\n'
                + '>     return shell_exec("echo $input | $markdown_script");',
            result = '<blockquote>'
                + '<h2>This is a header.</h2>'
                + '<ol>'
                + '<li>This is the first list item.</li>'
                + '<li>This is the second list item.</li>'
                + '</ol>'
                + '<p>Here\'s some example code:</p>'
                + '<pre><code>return shell_exec(&quot;echo $input | $markdown_script&quot;);\n</code></pre>'
                + '</blockquote>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});