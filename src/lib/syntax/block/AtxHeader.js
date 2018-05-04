/**
 * match a series of headers of atx format
 *
 * syntax like this:
 *
 *  # header 1 ( <h1></h1> )
 *  ## header 2 ( <h2></h2> )
 *  ### header 3 ( <h3></h3> )
 *  #### header 4 ( <h4></h4> )
 *  ##### header 5 ( <h5></h5> )
 *  ###### header 6 ( <h6></h6> )
 *
 * use 1-6 "#" characters at the start of the line, corresponding to header levels 1-6
 *
 * Optionally, you may "close" atx-style headers, like this:
 *
 *  # This is an H1 #
 *  ## This is an H2 ##
 *  ### This is an H3 ######
 *
 */

'use strict';

import Valid from '../../utils/Valid';
import Header from '../../utils/Header';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^(#{1,6})\s*(.*?)\s*(?:#{1,6})?(?:\n|$)/);

    // if no match or no header content
    if (!result || Valid.isBlank(result[2])) {
        return;
    }

    const level = result[1].length,
        rawValue = result[2];

    return [{
        type: 'AtxHeader',
        level,
        rawValue: rawValue + '\n'
    }, index];

}

function render(data = '', node, renderTree) {

    const level = node.level,
        innerHtml = `${node.rawValue || ''}${data}`;

    if (renderTree) {

        if (!renderTree.headerTree) {
            renderTree.headerTree = Header.initRoot();
        }

        Header.addHeaderNode(renderTree.headerTree, level, innerHtml);

    }

    return `<a id="${innerHtml}" href="#${innerHtml}"><h${level}>${innerHtml}</h${level}></a>`;

}

export default {
    parse,
    render
};