'use strict';

import Util from '../../utils/Util';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^(#{1,6})\s*(.*?)\s*(?:#{1,6})?(?:\n|$)/);

    if (!result || Util.trim(result[2], ' \t') === '') {
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