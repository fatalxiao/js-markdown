'use strict';

function parse(line, index, lines, renderTree) {

    const reg = /^\s*\[\^([^\[\]]+)\]:\s*(.+)(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    renderTree.footnotes.push({
        type: 'Footnote',
        key: result[1],
        rawValue: result[2]
    });

    return [null, index];

}

function render(data = '', node) {
    return `<div class="footnotes"><hr>${node.rawValue || ''}${data}</div>`;
}

export default {
    parse,
    render
};