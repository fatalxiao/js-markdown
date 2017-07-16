/**
 * match a inline style code
 *
 * All text in code block will be escaped.
 *
 * (1) basic syntax like this:
 *
 *  `code`
 *
 * (2) if you want to display "`"s in code, you can write like this
 *
 *  `` `code` ``
 *  ``` ``code`` ```
 *
 */

'use strict';

import Str from '../../utils/Str';

function parse(str, children, renderTree) {

    const result = str.match(/^(`+)(([\s\S]*?)\1)/);

    // there must be a closing identifier
    if (result && result[2]) {
        return [{
            type: 'InlineCode',
            rawValue: Str.encodeHTML(result[3])
        }, result[1].length + result[2].length];
    }

    return;

}

function render(data = '', node) {
    return `<code>${node.rawValue || ''}${data}</code>`;
}

export default {
    parse,
    render
};