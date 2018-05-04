/**
 * match a emphasize
 *
 * syntax like this:
 *
 *  *emphasized*
 *
 * or
 *
 *  _emphasized_
 *
 * emphasize can be nested
 *
 */

'use strict';

function parse(str, children, renderTree) {

    // const flag = str.at(0),
    //     reg = new RegExp(`([\\s\\S]*?)(\\${flag})`);
    //
    // let restStr = str.slice(1);
    //
    // if (!restStr.includes(flag)) {
    //     return;
    // }
    //
    // let count = 0,
    //     pn = 1,
    //     resultStr = '',
    //     result;
    //
    // // find the closing identifier
    // while (restStr.length > 0) {
    //
    //     result = restStr.match(reg);
    //
    //     if (!result) {
    //         break;
    //     }
    //
    //     if (result[1]) {
    //         restStr = restStr.slice(result[1].length);
    //         resultStr += result[1];
    //         continue;
    //     }
    //
    //     if (count === 0 && result[2]) {
    //         break;
    //     }
    //
    //     // if there is a Strong syntax
    //     if (restStr.startsWith(flag + flag)) {
    //         restStr = restStr.slice(2);
    //         resultStr += flag + flag;
    //         count += pn;
    //         pn = -pn;
    //     }
    //
    // }
    //
    // if (resultStr.length > 0) {
    //
    //     const node = { // emphasize root node
    //         type: 'Emphasize',
    //         rawValue: resultStr
    //     };
    //
    //     // parse recursively
    //     this.parseInline(node);
    //
    //     return [node, resultStr.length + 2];
    //
    // }
    //
    // return;

    const flag = str.at(0),
        reg = new RegExp(`([\\s\\S]*?)(\\${flag})`),

        restStr = str.slice(1),

        result = restStr.match(reg);

    if (!result) {
        return;
    }

    if (result[1].length > 0) {

        const node = { // strong root node
            type: 'Emphasize',
            rawValue: result[1]
        };

        // parse recursively
        this.parseInline(node);

        return [node, result[1].length + 2];

    }

    return;

}

function render(data = '', node) {
    return `<em>${node.rawValue || ''}${data}</em>`;
}

export default {
    parse,
    render
};