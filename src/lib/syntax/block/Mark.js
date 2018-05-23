/**
 * match a mark
 *
 * Use 3 or more "`" or "~" for the first line, and use info|warning|success|error, syntax like this:
 *
 *  ```info
 *  here is the code
 *  multi lines
 *  ```
 *
 * or
 *
 *  ~~~warning
 *  another example
 *  ~~~
 *
 */

'use strict';

import Str from '../../utils/Str';

/**
 * exclude the condition that if there is a same identifier in the same line
 * @param line
 */
function isInlineMatch(line) {
    return line.match(/^([`~]{3,}).*\1/);
}

function parse(line, index, lines, renderTree) {

    let result = line.match(/^([`~]{3,})\s*((info|warning|success|error)??)(?:\n|$)/);

    if (!result) {
        return;
    }

    // exclude inline code
    if (isInlineMatch(line)) {
        return;
    }

    const block = { // blockquote root node
            type: 'Mark',
            msgType: result[2],
            children: []
        },
        content = [];
    index++;
    for (let len = lines.length; index < len; index++) {
        if (Str.trimEnd(lines[index], ' \t') === result[1]) {
            break;
        }
        content.push(lines[index]);
    }

    // parse recursively
    this.parseBlocks(content, block);

    return [block, index];

}

function render(data = '', node) {
    return `<mark ${node.msgType}>${node.rawValue || ''}${data}</mark>`;
}

export default {
    parse,
    render
};