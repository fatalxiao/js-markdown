import _ from 'lodash';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^(#{1,6})\s*(.*?)\s*(?:#{1,6})(?:\n|$)/);

    if (!result || _.trim(result[2]) === '') {
        return;
    }

    return [{
        display: 'block',
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