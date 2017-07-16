/**
 * match a footnote
 *
 * use an id or number for footnote, syntax like this:
 *
 *  [^footnote1]: this is a footnote.
 *  [^2]: this is the second footnote.
 *
 * you can write it anywhere.
 *
 */

'use strict';

function parse(line, index, lines, renderTree) {

    const reg = /^\s*\[\^([^\[\]]+)\]:\s*(.+)(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    if (renderTree) {

        if (!renderTree.footnotes) {
            renderTree.footnotes = [];
        }

        renderTree.footnotes.push({
            type: 'Footnote',
            key: result[1],
            rawValue: result[2]
        });

    }

    return [null, index];

}

function render(data = '', node) {
    return `<div class="footnotes"><hr>${node.rawValue || ''}${data}</div>`;
}

export default {
    parse,
    render
};