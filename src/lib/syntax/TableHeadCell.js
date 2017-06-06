function parse(line, index, lines, renderTree) {



}

function render(data = '', node) {
    return `<th align="${node.align}">${data}</th>`;
}

export default {
    parse,
    render
};