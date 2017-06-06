import _ from 'lodash';

function parse(line, index, lines, renderTree) {

    const result = line.match(/^(#{1,6})\s*(.*?)\s*(?:\n|$)/);

    if (!result || _.trim(result[2]) === '') {
        return;
    }

    return [{
        display: 'block',
        type: 'AtxHeader',
        level: result[1].length,
        rawValue: result[2]
    }, index];

}

function render(data = '', node) {
    return `<h${node.level}>${data}</h${node.level}>`;
}

export default {
    parse,
    render
};