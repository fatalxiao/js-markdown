'use strict';

function render(data = '', node) {
    return `<th align="${node.align}">${node.rawValue || ''}${data}</th>`;
}

export default {
    render
};