function parse(line, index, lines, renderTree) {

}

function render(data = '', node) {
    return `<em>${node.rawValue || ''}${data}</em>`;
}

export default {
    parse,
    render
};