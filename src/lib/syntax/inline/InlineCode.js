function parse(line, index, lines, renderTree) {

}

function render(data = '', node) {
    return `<code>${node.rawValue || ''}${data}</code>`;
}

export default {
    parse,
    render
};