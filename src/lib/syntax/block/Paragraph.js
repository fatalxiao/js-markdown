function getPrev(renderTree) {

    if (!renderTree || !renderTree.children || renderTree.children.length < 1
        || !renderTree.children[renderTree.children.length - 1]) {
        return;
    }

    return renderTree.children[renderTree.children.length - 1];

}

function parse(line, index, lines, renderTree) {

    const prev = getPrev(renderTree);

    if (prev) {

        if (prev.type === 'Text') { // multi Text line will be a Paragraph
            prev.type = 'Paragraph';
            prev.rawValue += '\n' + line;
            return [null, index];
        }

        if (prev.type === 'Paragraph') { // append to prev Paragraph
            prev.rawValue += '\n' + line;
            return [null, index];
        }

    }

    // single line will be Text
    return [{
        type: 'Text',
        rawValue: line
    }, index];

}

function render(data = '', node) {
    return `<p>${node.rawValue || ''}${data}</p>`;
}

export default {
    parse,
    render
};