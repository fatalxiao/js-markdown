/**
 * match a superscript to display footnote number
 *
 * syntax like this:
 *
 *  see footnote1 [^footnote1]
 *  [^footnote1]: this is a footnote.
 *
 */

'use strict';

function parse(str, children, renderTree) {

    const result = str.match(/^\[\^(.*?)\]/);

    if (!result) {
        return;
    }

    for (let i = 0, len = renderTree.footnotes.length; i < len; i++) {

        if (renderTree.footnotes[i].key === result[1]) {

            // if one footnote is not used, it will be ignored and not rendered
            renderTree.footnotes[i].activated = true;

            return [{
                type: 'Superscript',
                index: i + 1,
                rawValue: ''
            }, result[0].length];

        }

    }

    return;

}

function render(data = '', node) {
    return `<sup id="fnref${node.index}">[<a href="#fn${node.index}" rel="footnote">${node.index}</a>]</sup>`;
}

export default {
    parse,
    render
};