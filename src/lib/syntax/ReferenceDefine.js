function parse(line, index, lines, renderTree) {

    debugger;

    const result = line.match(/^\s*\[([^\[\]]+)\]:\s*(.+)$/);

    if (!result) {
        return;
    }

    renderTree.referenceDefine[result[1]] = result[2];

    return;

}

function render(data = '', node) {
    return '';
}

export default {
    parse,
    render
};