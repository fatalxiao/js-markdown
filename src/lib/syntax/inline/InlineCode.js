'use strict';

import Util from '../../utils/Util';

function parse(str, children, renderTree) {

    const result = str.match(/^(`+)(([\s\S]*?)\1)/);

    if (result && result[2]) {
        return [{
            type: 'InlineCode',
            rawValue: Util.encodeHTML(result[3])
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