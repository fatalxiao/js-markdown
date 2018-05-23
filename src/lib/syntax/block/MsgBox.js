/**
 * match a message box
 *
 * All text in block will be escaped.
 *
 * (1) use 3 or more "`" or "~" for the first line, and add use, syntax like this:
 *
 *  ```info
 *  here is the code
 *  multi lines
 *  ```
 *
 * or
 *
 *  ~~~
 *  another example
 *  ~~~
 *
 * (2) use a tab or 4 space or 1~3 spaces plus a tab for line start, syntax like this:
 *
 *      here is the code
 *      multi lines
 *
 */

'use strict';

import Util from '../../utils/Util';
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

    let codeContent = [];
    index++;
    for (let len = lines.length; index < len; index++) {
        if (Str.trimEnd(lines[index], ' \t') === result[1]) {
            break;
        }
        codeContent.push(lines[index]);
    }

    return [{
        type: 'MsgBox',
        msgType: result[2],
        rawValue: Str.encodeHTML(Util.trimEndBlankLines(codeContent).join('\n'))
    }, index];

}

function render(data = '', node) {
    return `<${node.msgType}>${node.rawValue || ''}${data}</${node.msgType}>`;
}

export default {
    parse,
    render
};