/**
 * match a break row
 *
 * Input two space at the end of line which will render a "<br/>".
 *
 */

'use strict';

function parse(str, children, renderTree) {
    return [{
        type: 'BreakRow',
        rawValue: ''
    }, 3];
}

function render(data = '', node) {
    return '<br/>';
}

export default {
    parse,
    render
};