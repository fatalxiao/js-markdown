'use strict';

function render(data = '', node) {
    return `<td${node.align ? ` align="${node.align}"` : ''}>${node.rawValue || ''}${data}</td>`;
}

export default {
    render
};