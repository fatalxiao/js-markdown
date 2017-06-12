/**
 * match a series of headers
 *
 * syntax like this:
 *
 * # header 1 (<H1>)
 * ## header 2 (<H2>)
 * ### header 3 (<H3>)
 * #### header 4 (<H4>)
 * ##### header 5 (<H5>)
 * ###### header 6 (<H6>)
 *
 * use 1-6 "#" characters at the start of the line, corresponding to header levels 1-6
 *
 * Optionally, you may "close" atx-style headers, like this:
 *
 * # This is an H1 #
 * ## This is an H2 ##
 * ### This is an H3 ######
 *
 */

'use strict';

import Util from '../../utils/Util';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^(#{1,6})\s*(.*?)\s*(?:#{1,6})?(?:\n|$)/);

    // if no match or no header content
    if (!result || Util.isBlank(result[2])) {
        return;
    }

    return [{
        type: 'AtxHeader',
        level: result[1].length,
        rawValue: result[2] + '\n'
    }, index];

}

function render(data = '', node) {
    return `<h${node.level}>${node.rawValue || ''}${data}</h${node.level}>`;
}

export default {
    parse,
    render
};