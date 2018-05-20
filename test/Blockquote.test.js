'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Blockquote Test', () => {

    it('default', () =>
        expect(Markdown.parse(
            '> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
            + '> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
            + '> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.\n'
            + '>\n'
            + '> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
            + '> id sem consectetuer libero luctus adipiscing.'
        )).to.be.equal(
            '<blockquote>'
            + '<p>'
            + 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
            + 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
            + 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.'
            + '</p>'
            + '<p>'
            + 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
            + 'id sem consectetuer libero luctus adipiscing.'
            + '</p>'
            + '</blockquote>'
        )
    );

    it('omit ">"', () =>
        expect(Markdown.parse(
            '> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
            + '> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
            + '> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.\n'
            + '\n'
            + '> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
            + '> id sem consectetuer libero luctus adipiscing.'
        )).to.be.equal(
            '<blockquote>'
            + '<p>'
            + 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n'
            + 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n'
            + 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.'
            + '</p>'
            + '<p>'
            + 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n'
            + 'id sem consectetuer libero luctus adipiscing.'
            + '</p>'
            + '</blockquote>'
        )
    );

    it('nested', () =>
        expect(Markdown.parse(
            '> This is the first level of quoting.\n'
            + '>\n'
            + '> > This is nested blockquote.\n'
            + '>\n'
            + '> Back to the first level.'
        )).to.be.equal(
            '<blockquote>'
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
            + '</blockquote>'
        )
    );

    it('complicated nested', () =>
        expect(Markdown.parse(
            '> ## This is a header.\n'
            + '>\n'
            + '> 1.   This is the first list item.\n'
            + '> 2.   This is the second list item.\n'
            + '>\n'
            + '> Here\'s some example code:\n'
            + '>\n'
            + '>     return shell_exec("echo $input | $markdown_script");'
        )).to.be.equal(
            '<blockquote>'
            + '<h2><a id="This is a header." href="#This is a header."></a>This is a header.</h2>'
            + '<ol>'
            + '<li><p>This is the first list item.</p></li>'
            + '<li><p>This is the second list item.</p></li>'
            + '</ol>'
            + '<p>Here\'s some example code:</p>'
            + '<pre><code>return shell_exec(&quot;echo $input | $markdown_script&quot;);\n</code></pre>'
            + '</blockquote>'
        )
    );

});