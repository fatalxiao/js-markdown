'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Unordered List Test', () => {

    it('use "*"', () => {

        const md = '* Red\n'
            + '* Green\n'
            + '* Blue',
            result = '<ul>'
                + '<li><p>Red</p></li>'
                + '<li><p>Green</p></li>'
                + '<li><p>Blue</p></li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('use "+"', () => {

        const md = '+ Red\n'
            + '+ Green\n'
            + '+ Blue',
            result = '<ul>'
                + '<li><p>Red</p></li>'
                + '<li><p>Green</p></li>'
                + '<li><p>Blue</p></li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('use "-"', () => {

        const md = '- Red\n'
            + '- Green\n'
            + '- Blue',
            result = '<ul>'
                + '<li><p>Red</p></li>'
                + '<li><p>Green</p></li>'
                + '<li><p>Blue</p></li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('omit "*"', () => {

        const md = '* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n'
            + '    \n'
            + '    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\n'
            + '    viverra nec, fringilla in, laoreet vitae, risus.\n'
            + '    \n'
            + '* Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\n'
            + '    Suspendisse id sem consectetuer libero luctus adipiscing.',
            result = '<ul>'
                + '<li>'
                + '<p>'
                + 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
                + '</p>'
                + '<p>'
                + 'Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\n'
                + 'viverra nec, fringilla in, laoreet vitae, risus.'
                + '</p>'
                + '</li>'
                + '<li>'
                + '<p>'
                + 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\n'
                + 'Suspendisse id sem consectetuer libero luctus adipiscing.'
                + '</p>'
                + '</li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('omit "*" and indent 1', () => {

        const md = '* Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n'
            + 'Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\n'
            + 'viverra nec, fringilla in, laoreet vitae, risus.\n'
            + '* Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\n'
            + 'Suspendisse id sem consectetuer libero luctus adipiscing.',
            result = '<ul>'
                + '<li>'
                + '<p>'
                + 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n'
                + 'Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\n'
                + 'viverra nec, fringilla in, laoreet vitae, risus.'
                + '</p>'
                + '</li>'
                + '<li>'
                + '<p>'
                + 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\n'
                + 'Suspendisse id sem consectetuer libero luctus adipiscing.'
                + '</p>'
                + '</li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('omit "*" and indent 2', () => {

        const md = '* This is a list item with two paragraphs.\n'
            + '\n'
            + '    This is the second paragraph in the list item. You\'re\n'
            + 'only required to indent the first line. Lorem ipsum dolor\n'
            + 'sit amet, consectetuer adipiscing elit.\n'
            + '\n'
            + '*   Another item in the same list.',
            result = '<ul>'
                + '<li>'
                + '<p>This is a list item with two paragraphs.</p>'
                + '<p>'
                + 'This is the second paragraph in the list item. You\'re\n'
                + 'only required to indent the first line. Lorem ipsum dolor\n'
                + 'sit amet, consectetuer adipiscing elit.'
                + '</p>'
                + '</li>'
                + '<li><p>Another item in the same list.</p></li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with blank line', () => {

        const md = '* Red\n'
            + '\n'
            + '* Green\n'
            + '\n'
            + '* Blue',
            result = '<ul>'
                + '<li><p>Red</p></li>'
                + '<li><p>Green</p></li>'
                + '<li><p>Blue</p></li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('nested unordered list', () => {

        const md = '* A list item with a blockquote:\n'
            + '\n'
            + '    * sub list 1\n'
            + '    * sub list 2',
            result = '<ul>'
                + '<li>'
                + '<p>A list item with a blockquote:</p>'
                + '<ul>'
                + '<li><p>sub list 1</p></li>'
                + '<li><p>sub list 2</p></li>'
                + '</ul>'
                + '</li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('nested blockquote', () => {

        const md = '* A list item with a blockquote:\n'
            + '\n'
            + '    > This is a blockquote\n'
            + '    > inside a list item.',
            result = '<ul>'
                + '<li>'
                + '<p>A list item with a blockquote:</p>'
                + '<blockquote>'
                + '<p>This is a blockquote\ninside a list item.</p>'
                + '</blockquote>'
                + '</li>'
                + '</ul>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('break list', () => {

        const md = '* List\n'
            + '\n'
            + 'Paragraph',
            result = '<ul>'
                + '<li>'
                + '<p>List</p>'
                + '</li>'
                + '</ul>'
                + '<p>Paragraph</p>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});

describe('Ordered List Test', () => {

    it('default', () => {

        const md = '1. Bird\n'
            + '2. McHale\n'
            + '3. Parish',
            result = '<ol>'
                + '<li><p>Bird</p></li>'
                + '<li><p>McHale</p></li>'
                + '<li><p>Parish</p></li>'
                + '</ol>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with wrong number', () => {

        const md = '3. Bird\n'
            + '1. McHale\n'
            + '8. Parish',
            result = '<ol>'
                + '<li><p>Bird</p></li>'
                + '<li><p>McHale</p></li>'
                + '<li><p>Parish</p></li>'
                + '</ol>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('consist of paragraphs', () => {

        const md = '1. This is a list item with two paragraphs. Lorem ipsum dolor\n'
            + '    sit amet, consectetuer adipiscing elit. Aliquam hendrerit\n'
            + '    mi posuere lectus.\n'
            + '\n'
            + '    Vestibulum enim wisi, viverra nec, fringilla in, laoreet\n'
            + '    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum\n'
            + '    sit amet velit.\n'
            + '\n'
            + '2. Suspendisse id sem consectetuer libero luctus adipiscing.\n'
            + '\n'
            + '\n'
            + '3. New Ordered List.',
            result = '<ol>'
                + '<li>'
                + '<p>'
                + 'This is a list item with two paragraphs. Lorem ipsum dolor\n'
                + 'sit amet, consectetuer adipiscing elit. Aliquam hendrerit\n'
                + 'mi posuere lectus.'
                + '</p>'
                + '<p>'
                + 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet\n'
                + 'vitae, risus. Donec sit amet nisl. Aliquam semper ipsum\n'
                + 'sit amet velit.'
                + '</p>'
                + '</li>'
                + '<li>'
                + '<p>'
                + 'Suspendisse id sem consectetuer libero luctus adipiscing.'
                + '</p>'
                + '</li>'
                + '<li>'
                + '<p>'
                + 'New Ordered List.'
                + '</p>'
                + '</li>'
                + '</ol>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with strong emphasize', () => {

        const md = '1. **a**: aaaaaaaaaaa:  \n'
            + '   ![image](./images/image.png)'
            + '   **a1**: a1.  \n'
            + '   **a2**: a2.',
            result = '<ol>'
                + '<li>'
                + '<p>'
                + '<strong>a</strong>: aaaaaaaaaaa:<br/>'
                + '   <img alt="image" src="./images/image.png"/>'
                + '   <strong>a1</strong>: a1.<br/>'
                + '   <strong>a2</strong>: a2.'
                + '</p>'
                + '</li>'
                + '</ol>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});