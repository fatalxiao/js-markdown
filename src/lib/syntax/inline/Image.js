function parse(line, index, lines, renderTree) {

}

function render(data = '', node) {
    return `<img ${node.alt ? `alt="${node.alt}"` : ''} src="${node.src}"/>`;
}

export default {
    parse,
    render
};