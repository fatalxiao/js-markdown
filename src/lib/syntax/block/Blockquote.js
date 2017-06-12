/**
 * match a multi lines quote block
 *
 * syntax like this:
 *
 *  > This is a blockquote with two paragraphs.
 *  >
 *  > Paragraph two.
 *
 * Technically not every line needs to start with a `>`
 * as long as there are no empty lines between paragraphs, like this:
 *
 *  > This is a blockquote
 *  second line
 *  third line.
 *
 *  > another paragraph.
 *
 * blockquotes can be nested, like this:
 *
 *  > blockquote
 *  >
 *  > > can be nested.
 *  > > > Multiple Levels
 *  >
 *  > ## This is a header.
 *  >
 *  > 1.   This is the first list item.
 *  > 2.   This is the second list item.
 *  >
 *  > Here's some example code:
 *  >
 *  >     return 'Hellow World!';
 *
 */

'use strict';

import Util from '../../utils/Util';

/**
 * remove space which starts with the blockquote content string
 * @param data
 * @returns {ArrayBuffer|Array.<T>|Blob|string|*}
 */
function handleData(data) {
    return data.startsWith(' ') ? data.slice(1) : data;
}

function parse(line, index, lines, renderTree) {

    const reg = /^(?:\>)(?:\s*?)(.*?)(?:\n|$)/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    const block = { // blockquote root node
            type: 'Blockquote',
            children: []
        },
        content = [handleData(result[1])]; // all blockquote content

    let blankLineFlag = false,
        lineType;

    index++;
    for (let len = lines.length; index < len; index++) {

        // if this line is blank
        if (Util.isBlank(lines[index])) {

            blankLineFlag = true;

            content.push(lines[index]);
            continue;

        }

        // calculate this line type
        lineType = this.parseBlock(lines[index], 0, lines.slice(index))[0].type;

        // only
        // (1) no blank line
        // (2) continuous blockquote or text
        // is valid
        if (
            (lineType !== 'Blockquote' && lineType !== 'Paragraph' && lineType !== 'Text')
            ||
            (blankLineFlag && (lineType === 'Paragraph' || lineType === 'Text'))
        ) {
            index--;
            break;
        }

        // append text to blockquote content
        if (lineType === 'Paragraph' || lineType === 'Text') {
            content.push(lines[index]);
            continue;
        }

        result = lines[index].match(reg);

        if (!result) {
            index--;
            break;
        }

        content.push(handleData(result[1]));
        blankLineFlag = false;

    }

    // parse recursively
    this.parseBlocks(content, block);

    return [block, index];

}

function render(data = '', node) {
    return `<blockquote>${node.rawValue || ''}${data}</blockquote>`;
}

export default {
    parse,
    render
};