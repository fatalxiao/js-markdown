function parse(str, children, renderTree) {

}

function render(data = '', node) {
    return `\\${node.rawValue}`;
}

export default {
    parse,
    render
};