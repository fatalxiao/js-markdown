/**
 * match a series of headers of setext format
 *
 * syntax like this:
 *
 *  header 1 ( <h1></h1> )
 *  =================
 *
 * or
 *
 *  header 2 ( <h2></h2> )
 *  -----------------
 *
 */

'use strict';

import Util from '../../utils/Util';

function parse(line, index, lines, renderTree) {

    // blank line or last line
    if (Util.isBlank(line) || index >= lines.length - 1) {
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

function render(data = '', node) {
    return `<h${node.level}>${node.rawValue || ''}${data}</h${node.level}>`;
}

export default {
    parse,
    render
};