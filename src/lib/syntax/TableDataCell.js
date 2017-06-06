function parse(line, index, lines, renderTree) {



}

function render(data = '', node) {
    return `<td align="${node.align}">${data}</td>`;
}

export default {
    parse,
    render
};