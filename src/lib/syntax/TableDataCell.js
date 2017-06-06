function parse(line, index, lines, renderTree) {



}

function render(data = '', node) {
    return `<td align="${node.align}">${node.rawValue || ''}${data}</td>`;
}

export default {
    parse,
    render
};