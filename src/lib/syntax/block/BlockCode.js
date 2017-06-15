/**
 * match a multi lines code block
 *
 * All text in code block will be escaped.
 *
 * (1) use 3 or more "`" or "~" for the first line, syntax like this:
 *
 *  ```
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

/**
 * exclude the condition that if there is a same identifier in the same line
 * @param line
 */
function isInlineMatch(line) {
    return line.match(/^([`~]{3,}).*\1/);
}

function parse(line, index, lines, renderTree) {

    let result = line.match(/^([`~]{3,}| {4}|\t| {0,3}\t)\s*(.*?)(?:\n|$)/);

    if (!result) {
        return;
    }

    // exclude inline code
    if (isInlineMatch(line)) {
        return;
    }

    if (result[1].includes('\t') || result[1].includes(' ')) { // space or tab

        const indentLen = result[1].length;
        let codeContent = [result[2]];
        index++;

        for (let len = lines.length; index < len; index++) {
            if (Util.trim(lines[index], ' \t') !== '' && !lines[index].startsWith(result[1])) {
                break;
            }
            codeContent.push(lines[index].slice(indentLen));
        }

        return [{
            type: 'BlockCode',
            rawValue: Util.encodeHTML(Util.trimEndBlankLines(codeContent).join('\n')) + '\n'
        }, index - 1];

    } else { // ``` or ~~~

        let codeContent = [];
        index++;
        for (let len = lines.length; index < len; index++) {
            if (Util.trimEnd(lines[index], ' \t') === result[1]) {
                break;
            }
            codeContent.push(lines[index]);
        }

        return [{
            type: 'BlockCode',
            language: result[2],
            rawValue: Util.encodeHTML(Util.trimEndBlankLines(codeContent).join('\n'))
        }, index];

    }

}

function render(data = '', node) {
    return `<pre><code${node.language ? ` lang="${node.language}"` : ''}>${node.rawValue || ''}${data}</code></pre>`;
}

export default {
    parse,
    render
};