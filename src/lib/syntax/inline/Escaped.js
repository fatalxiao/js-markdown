function parse(line, index, lines, renderTree) {

}

function render(data = '', node) {
    return `\\${node.rawValue}`;
}

export default {
    parse,
    render
};