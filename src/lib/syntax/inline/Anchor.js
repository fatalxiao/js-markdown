function parse(line, index, lines, renderTree) {

}

function render(data = '', node) {
    return `<a href="${node.href}">${node.rawValue || ''}${data}</a>`;
}

export default {
    parse,
    render
};