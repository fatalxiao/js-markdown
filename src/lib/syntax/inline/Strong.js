/**
 * match a strong
 *
 * syntax like this:
 *
 *  **strong**
 *
 * or
 *
 *  __strong__
 *
 * strong can be nested
 *
 */

'use strict';

function parse(str, children, renderTree) {

    const flag = str.at(0),
        reg = new RegExp(`([\\s\\S]*?)(\\${flag}\\${flag})`),

        restStr = str.slice(2),

        result = restStr.match(reg);

    if (!result) {
        return;
    }

    if (result[1].length > 0) {

        const node = { // strong root node
            type: 'Strong',
            rawValue: result[1]
        };

        // parse recursively
        this.parseInline(node);

        return [node, result[1].length + 4];

    }

    return;

}

function render(data = '', node) {
    return `<strong>${node.rawValue || ''}${data}</strong>`;
}

export default {
    parse,
    render
};