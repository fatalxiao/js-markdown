/**
 * match meta data
 *
 * meta data must be written at the beginning of file, syntax like this:
 *
 *  metadata: Hello World!
 *  key:      value
 *
 */

'use strict';

function parse(line, index, lines, renderTree) {

    // if not first line
    if (index > 0) {
        return;
    }

    const reg = /^(\w+):\s*(.+?)(?:\n|$)/;

    let result = line.match(reg);

    if (!result) {
        return;
    }

    // save it in renderTree.metaData
    renderTree.metaData[result[1]] = result[2];

    index++;
    for (let len = lines.length; index < len; index++) {

        result = lines[index].match(reg);

        if (!result) {
            index--;
            break;
        }

        renderTree.metaData[result[1]] = result[2];

    }

    return [null, index];

}

export default {
    parse
};