/**
 * match a strong and emphasize
 *
 * syntax like this:
 *
 *  ***strong***
 *
 * or
 *
 *  ___strong___
 *
 */

'use strict';

function parse(str, children, renderTree) {

    const flag = str.at(0),
        reg = new RegExp(`([\\s\\S]*?)(\\${flag}\\${flag}\\${flag})`),

        restStr = str.slice(3),
        result = restStr.match(reg);

    if (!result) {
        return;
    }

    if (result[1].length > 0) {

        const node = { // strong root node
            type: 'StrongEmphasize',
            rawValue: result[1]
        };

        // parse recursively
        this.parseInline(node);

        return [node, result[1].length + 6];

    }

    return;

}

function render(data = '', node) {
    return `<strong><em>${node.rawValue || ''}${data}</em></strong>`;
}

export default {
    parse,
    render
};