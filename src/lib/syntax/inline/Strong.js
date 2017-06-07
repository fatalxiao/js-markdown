function parse(line, index, lines, renderTree) {

}

function render(data = '', node) {
    return `<strong>${node.rawValue || ''}${data}</strong>`;
}

export default {
    parse,
    render
};