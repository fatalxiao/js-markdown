/**
 * match a horizontal rule
 *
 * syntax like this:
 *
 *  * * *
 *  ***
 *  *****
 *  - - -
 *  ---------------------------------------
 *
 *  above are all valid.
 *
 */

'use strict';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^([\*\-])([ \t]?\1)([ \t]?\1)*(?:\n|$)/);

    if (!result) {
        return;
    }

    return [{
        type: 'HorizontalRule'
    }, index];

}

function render(data = '', node) {
    return '<hr/>';
}

export default {
    parse,
    render
};