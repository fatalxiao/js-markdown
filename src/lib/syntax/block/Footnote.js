function parse(line, index, lines, renderTree) {

    const reg = /^\s*\[\^([^\[\]]+)\]:\s*(.+)$/;
    let result = line.match(reg);

    if (!result) {
        return;
    }

    if (!(result[1] in renderTree.footnotes)) {
        renderTree.footnotes[result[1]] = result[2];
    }

    return [null, index];

}

function render(data = '', node) {
    return '';
}

export default {
    parse,
    render
};