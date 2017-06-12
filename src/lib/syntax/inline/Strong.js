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
        reg = new RegExp(`([\\s\\S]*?)(\\${flag})`);

    let restStr = str.slice(2);

    if (!restStr.includes(flag + flag)) {
        return;
    }

    let count = 0,
        pn = 1,
        resultStr = '',
        result;

    // find the closing identifier
    while (restStr.length > 0) {

        // find closing identifier
        if (count === 0 && restStr.startsWith(flag + flag)) {
            break;
        }

        result = restStr.match(reg);

        if (!result) {
            break;
        }

        if (result[1]) {
            restStr = restStr.slice(result[1].length);
            resultStr += result[1];
            continue;
        }

        if (result[2]) {
            restStr = restStr.slice(result[2].length);
            resultStr += result[2];
            count += pn;
            pn = -pn;
        }

    }

    if (resultStr.length > 0) {

        const node = { // strong root node
            type: 'Strong',
            rawValue: resultStr
        };

        // parse recursively
        this.parseInline(node);

        return [node, resultStr.length + 4];

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