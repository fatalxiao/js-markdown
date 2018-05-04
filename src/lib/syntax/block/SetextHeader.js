/**
 * match a series of headers of setext format
 *
 * syntax like this:
 *
 *  header 1 ( <h1></h1> )
 *  ======================
 *
 * or
 *
 *  header 2 ( <h2></h2> )
 *  ----------------------
 *
 */

'use strict';

import Valid from '../../utils/Valid';
import Header from '../../utils/Header';

function parse(line, index, lines, renderTree) {

    // blank line or last line
    if (Valid.isBlank(line) || index >= lines.length - 1) {
        return;
    }

    const nextLine = lines[index + 1],
        result = nextLine.match(/^([-=])\1\1+(?:\n|$)/);

    if (!result) {
        return;
    }

    return [{
        type: 'SetextHeader',
        level: result[1] === '=' ? 1 : 2,
        rawValue: line
    }, index + 1];

}

function render(data = '', node, renderTree) {

    const level = node.level,
        innerHtml = `${node.rawValue || ''}${data}`;

    if (renderTree) {

        if (!renderTree.headerTree) {
            renderTree.headerTree = Header.initRoot();
        }

        Header.addHeaderNode(renderTree.headerTree, level, innerHtml);

    }

    return `<a id="${innerHtml}" href="#${innerHtml}"><h${level}>${innerHtml}</h${level}></a>`;

}

export default {
    parse,
    render
};