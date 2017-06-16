'use strict';

function render(data = '', node) {
    return `<th${node.align ? ` align="${node.align}"` : ''}>${node.rawValue || ''}${data}</th>`;
}

export default {
    render
};