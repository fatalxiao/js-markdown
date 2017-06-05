import _ from 'lodash';

function parse(line, index, lines, blocks) {

    if (line === '' || _.trim(line) === '' || line === '#' || _.trim(line) === '#') {
        return [{
            display: 'block',
            type: 'BlankLine',
            rawValue: ''
        }, index];
    } else if (blocks && blocks.length > 0 && blocks[blocks.length - 1].type === 'Paragraph') {
        blocks[blocks.length - 1].rawValue += '\n' + line;
        return [null, index];
    } else {
        return [{
            display: 'block',
            type: 'Paragraph',
            rawValue: line
        }, index];
    }

}

function render(data = '', node) {
    return `<p>${_.trim(data || node.rawValue || '')}</p>`;
}

export default {
    parse,
    render
};