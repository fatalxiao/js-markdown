'use strict';

import Markdown from '../src';
import chai from 'chai';

const expect = chai.expect;

describe('Table Test', () => {

    it('default', () => {

        const md = '| First Header  | Second Header |\n'
            + '| ------------- | ------------- |\n'
            + '| Content Cell  | Content Cell |\n'
            + '| Content Cell  | Content Cell |',
            result = '<table>'
                + '<thead>'
                + '<tr>'
                + '<th>First Header</th>'
                + '<th>Second Header</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('min separator', () => {

        const md = '| First Header  | Second Header |\n'
            + '| --- | --- |\n'
            + '| Content Cell  | Content Cell |\n'
            + '| Content Cell  | Content Cell |',
            result = '<table>'
                + '<thead>'
                + '<tr>'
                + '<th>First Header</th>'
                + '<th>Second Header</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('min separator center', () => {

        const md = '| First Header  | Second Header | Third Header | Fourth Header |\n'
            + '| --- | :-- | --: | :-: |\n'
            + '| Content Cell  | Content Cell | Content Cell | Content Cell |\n'
            + '| Content Cell  | Content Cell | Content Cell | Content Cell |',
            result = '<table>'
                + '<thead>'
                + '<tr>'
                + '<th>First Header</th>'
                + '<th align="left">Second Header</th>'
                + '<th align="right">Third Header</th>'
                + '<th align="center">Fourth Header</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td align="left">Content Cell</td>'
                + '<td align="right">Content Cell</td>'
                + '<td align="center">Content Cell</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td align="left">Content Cell</td>'
                + '<td align="right">Content Cell</td>'
                + '<td align="center">Content Cell</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('without wrapper', () => {

        const md = 'First Header  | Second Header\n'
            + '------------- | -------------\n'
            + 'Content Cell  | Content Cell\n'
            + 'Content Cell  | Content Cell',
            result = '<table>'
                + '<thead>'
                + '<tr>'
                + '<th>First Header</th>'
                + '<th>Second Header</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('forget some wrappers', () => {

        const md = '|First Header  | Second Header\n'
            + '------------- | -------------\n'
            + '|Content Cell  | Content Cell\n'
            + 'Content Cell  | Content Cell|',
            result = '<table>'
                + '<thead>'
                + '<tr>'
                + '<th>First Header</th>'
                + '<th>Second Header</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '<tr>'
                + '<td>Content Cell</td>'
                + '<td>Content Cell</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

    it('with align', () => {

        const md = '| Left Aligned  | Center Aligned  | Right Aligned |\n'
            + '|:------------- |:---------------:| -------------:|\n'
            + '| col 3 is      | some wordy text |         $1600 |\n'
            + '| col 2 is      | centered        |           $12 |\n'
            + '| zebra stripes | are neat        |            $1 |',
            result = '<table>'
                + '<thead>'
                + '<tr>'
                + '<th align="left">Left Aligned</th>'
                + '<th align="center">Center Aligned</th>'
                + '<th align="right">Right Aligned</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + '<tr>'
                + '<td align="left">col 3 is</td>'
                + '<td align="center">some wordy text</td>'
                + '<td align="right">$1600</td>'
                + '</tr>'
                + '<tr>'
                + '<td align="left">col 2 is</td>'
                + '<td align="center">centered</td>'
                + '<td align="right">$12</td>'
                + '</tr>'
                + '<tr>'
                + '<td align="left">zebra stripes</td>'
                + '<td align="center">are neat</td>'
                + '<td align="right">$1</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';

        expect(Markdown.parse(md)).to.be.equal(result);

    });

});