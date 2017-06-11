'use strict';

function render(data = '', node) {
    return `<td align="${node.align}">${node.rawValue || ''}${data}</td>`;
}

export default {
    render
};