import _ from 'lodash';

function getPrev(renderTree) {

    if (!renderTree || !renderTree.children || renderTree.children.length < 1
        || !renderTree.children[renderTree.children.length - 1]) {
        return;
    }

    return renderTree.children[renderTree.children.length - 1];

}

function parse(line, index, lines, renderTree) {

    const prev = getPrev(renderTree);

    if (line === '' || _.trim(line) === '' || line === '#' || _.trim(line) === '#') {

        if (prev && prev.type !== 'BlankLine') {
            return [{
                display: 'block',
                type: 'BlankLine',
                rawValue: ''
            }, index];
        } else {
            return;
        }

    } else if (prev && prev.type === 'Paragraph') {
        prev.rawValue += '\n' + line;
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
    return `<p>${node.rawValue || ''}${_.trim(data)}</p>`;
}

export default {
    parse,
    render
};