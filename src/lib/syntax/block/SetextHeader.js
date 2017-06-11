'use strict';

import Util from '../../utils/Util';

function parse(line, index, lines, renderTree) {

    if (line === '' || Util.trim(line, ' \t') === '' || index >= lines.length - 1) {
        return;
    }

    const nextLine = lines[index + 1],
        result = nextLine.match(/^([-=])\1\1+(?:\n|$)/);

    if (!result) {
        return;
    }

    return [{
        type: 'SetextHeader',
        level: result[1] === '=' ? 1 : 2,
        rawValue: line
    }, index + 1];

}

function render(data = '', node) {
    return `<h${node.level}>${node.rawValue || ''}${data}</h${node.level}>`;
}

export default {
    parse,
    render
};