function parse(line, index, lines, renderTree) {



}

function render(data = '', node) {
    return `<th align="${node.align}">${node.rawValue || ''}${data}</th>`;
}

export default {
    parse,
    render
};