import _ from 'lodash';

function parse(line, index, lines, renderTree) {

    if (line === '' || _.trim(line) === '' || line === '#' || _.trim(line) === '#') {
        return [{
            display: 'block',
            type: 'BlankLine',
            rawValue: ''
        }, index];
    } else if (renderTree && renderTree.children && renderTree.children.length > 0
        && renderTree.children[renderTree.children.length - 1].type === 'Paragraph') {
        renderTree.children[renderTree.children.length - 1].rawValue += '\n' + line;
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
    return `<p>${_.trim(data)}</p>`;
}

export default {
    parse,
    render
};